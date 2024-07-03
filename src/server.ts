import fastify from "fastify";

const server = fastify({
  logger: {
    transport: {
      target: "pino-pretty",
    },
  },
});

console.log("Hello World");
async function startServer() {
  try {
    server.listen({ port: 7000, host: "::1" });
  } catch (error) {
    server.log.error(error);
    process.exit(1);
  }
}

startServer();
