import {
  McpServer,
  ResourceTemplate,
} from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";
import {
  CreateMessageResultSchema,
  SamplingMessageSchema,
} from "@modelcontextprotocol/sdk/types.js";

const server = new McpServer(
  {
    name: "test-video",
    version: "1.0.0",
  },
  {
    capabilities: {
      resources: {},
      tools: {},
      prompts: {},
    },
  },
);

async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
}

server.registerTool(
  "create-user",
  {
    title: "Create User",
    description: "Create a new user in the database",
    inputSchema: {
      name: z.string(),
      email: z.string(),
      address: z.string(),
      phone: z.string(),
    },
    outputSchema: z.string(),
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async (args) => {
    try {
      let { name, email, phone, address } = args;
      if (!phone || !address || !email || !name) {
        const resp = await server.server.request({
          method: "elicitation/create",
          params: {
            message: `Please provide the phone number:`,
            requestedSchema: {
              type: "object",
              properties: {
                phone: { type: "string", description: "Phone number" },
              },
              required: ["phone"],
            },
          },
        });
        phone = resp.phone;
      }

      const id = await createUser({ name, email, phone, address });
      return {
        content: [{ type: "text", text: `User created with ID: ${id}` }],
      };
    } catch {
      return { content: [{ type: "text", text: `Failed to create user.` }] };
    }
  },
);

server.registerTool(
  "create-random-user",
  {
    title: "Create Random User",
    description: "Create a random user with fake data",
    annotations: {
      readOnlyHint: false,
      destructiveHint: false,
      idempotentHint: false,
      openWorldHint: true,
    },
  },
  async () => {
    const res = await server.server.request(
      {
        method: "sampling/createMessage",
        params: {
          messages: [
            {
              role: "user",
              content: {
                type: "text",
                text: "Generate fake user data. The user should have a realistic name, email, address, and phone number. Return this data as a JSON object with no other text or formatter so it can be used with JSON.parse.",
              },
            },
          ],
          maxTokens: 1024,
        },
      },
      CreateMessageResultSchema,
    );

    if (res.content.type !== "text") {
      return {
        content: [{ type: "text", text: "Failed to generate user data" }],
      };
    }

    try {
      const fakeUser = JSON.parse(
        res.content.text
          .trim()
          .replace(/^```json/, "")
          .replace(/```$/, "")
          .trim(),
      );

      const id = await createUser(fakeUser);
      return {
        content: [{ type: "text", text: `User ${id} created successfully` }],
      };
    } catch {
      return {
        content: [{ type: "text", text: "Failed to generate user data" }],
      };
    }
  },
);

server.registerResource(
  "users",
  "user://all",
  {
    description: "Get all users data from the database",
    title: "Users",
    mimeType: "application/json",
  },
  async (uri) => {
    const users = await import("./data/users.json", {
      with: { type: "json" },
    }).then((m) => m.default);

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(users),
          mimeType: "application/json",
        },
      ],
    };
  },
);

server.registerResource(
  "user-details",
  new ResourceTemplate("users://{userId}/profile", { list: undefined }),
  {
    description: "Get all users data from the database",
    title: "Users",
    mimeType: "application/json",
  },
  async (uri, { userId }) => {
    const users = await import("./data/users.json", {
      with: { type: "json" },
    }).then((m) => m.default);
    const user = users.find((u) => u.id === parseInt(userId as string));

    if (user == null) {
      return {
        contents: [
          {
            uri: uri.href,
            text: JSON.stringify({ error: "User not found" }),
            mimeType: "application/json",
          },
        ],
      };
    }

    return {
      contents: [
        {
          uri: uri.href,
          text: JSON.stringify(users),
          mimeType: "application/json",
        },
      ],
    };
  },
);

server.registerPrompt(
  "generate-fake-user",
  {
    title: "Generate fake user",
    description:
      "Generates a fake user including email, address, and phone number based on the given name.",
    argsSchema: {
      name: z.string(),
    },
  },
  ({ name }) => {
    return {
      messages: [
        {
          role: "user",
          content: {
            type: "text",
            text: `Generate a fake user with the name ${name} including email, address, and phone number.`,
          },
        },
      ],
    };
  },
);

async function createUser(user: {
  name: string;
  email: string;
  address: string;
  phone: string;
}) {
  const users = await import("./data/users.json", {
    with: { type: "json" },
  }).then((m) => m.default);

  const id = users.length + 1;

  users.push({ id, ...user });

  await fs.writeFile("./src/data/users.json", JSON.stringify(users, null, 2));

  return id;
}

main();
