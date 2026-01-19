# MCP Server & Client (Learning Project)

This is my personal attempt to learn the Model Context Protocol (MCP) by building a simple TypeScript **MCP server** and **MCP client**.

---

## Setup

### Install dependencies

```bash
npm install
```

### Build the server

```bash
npm run server:build
```

### (Optional) Watch and rebuild on changes

```bash
npm run server:build:watch
```

### Environment variables

Create a `.env` file in the project root:

```bash
GEMINI_API_KEY=your_gemini_api_key_here
```

---

## Run

### Server (dev, TypeScript)

```bash
npm run server:dev
```

### Client (CLI)

```bash
npm run client:dev
```

- `server:build:watch` keeps the compiled `build/server.js` in sync as you edit `src/server.ts`.

---

## Docs

- Server details: [Server.md](./Server.md)
- Client details: [Client.md](./Client.md)
