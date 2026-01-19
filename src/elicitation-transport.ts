import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { input } from "@inquirer/prompts";

type JsonRpcRequest = {
  jsonrpc: "2.0";
  id: number | string;
  method: string;
  params?: any;
};

type JsonRpcResponse = {
  jsonrpc: "2.0";
  id: number | string;
  result?: any;
  error?: any;
};

export class ElicitationAwareTransport extends StdioClientTransport {
  // 👇 this is the interception point
  protected async handleIncomingMessage(
    message: JsonRpcRequest,
  ): Promise<JsonRpcResponse | null> {
    if (message.method === "elicitation/create") {
      return this.handleElicitation(message);
    }

    // Let the SDK handle everything else
    return null;
  }

  private async handleElicitation(
    message: JsonRpcRequest,
  ): Promise<JsonRpcResponse> {
    const { id, params } = message;
    const { message: promptMessage, requestedSchema } = params;

    console.log(`\n⚠️  ELICITATION REQUIRED`);
    console.log(promptMessage);

    const result: Record<string, string> = {};

    const requiredFields: string[] = requestedSchema.required ?? [];

    for (const field of requiredFields) {
      result[field] = await input({
        message: `Enter ${field}:`,
      });
    }

    return {
      jsonrpc: "2.0",
      id,
      result,
    };
  }
}
