import { createServer } from "./createServer.js";

const server = createServer();


async function startServer() {
  try {
    server.listen({ port: 7000, host: "::1" });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

startServer();
