import request from "supertest";
import { createServer } from "../src/createServer";
import { FastifyInstance } from "fastify";
import { User } from "../src/db/model/user";
import { db } from "../src/db";
describe("/api/users", () => {
  let server: FastifyInstance;

  beforeAll(async () => {
    server = createServer();
    await server.ready();
    await db.sync();
    await User.destroy({ truncate: true });
  });

  it("returns 200 OK when signup is valid", async () => {
    const res = await request(server.server)
      .post("/api/users")
      .send({ username: "user1", password: "1234564t3", email: "ali@ahmed" });
    expect(res.status).toBe(200);
  });
  it("returns message", async () => {
    const res = await request(server.server)
      .post("/api/users")
      .send({ username: "user1", password: "1234564t3", email: "ali@ahmed" });
    expect(res.body.message).toBe("user created");
  });

  it("creates user in database", async () => {
    const res = await request(server.server)
      .post("/api/users")
      .send({ username: "user1", password: "1234564t3", email: "ali@ahmed" });
    const user = await User.findAll();
    expect(user[0].dataValues.username).toBe("user1");
    expect(user[0].dataValues.email).toBe("ali@ahmed");
  });

  afterAll(() => {
    server.close();
  });
});
