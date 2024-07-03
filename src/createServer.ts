import fastify, { FastifyReply, FastifyRequest } from "fastify";
import { User } from "./db/model/user";
export function createServer() {
  const server = fastify({
    logger: {
      transport: {
        target: "pino-pretty",
      },
    },
  });

  server.post(
    "/api/users",
    async (
      req: FastifyRequest<{
        Body: { username: string; password: string; email: string };
      }>,
      reply: FastifyReply
    ) => {
      await User.create(req.body);
      return reply.status(200).send({ message: "user created" });
    }
  );

  return server;
}
