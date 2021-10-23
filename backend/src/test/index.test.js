import { request } from "supertest";
import index from '../index.js';
import { createTestClient } from 'apollo-server-integration-testing';

test("", async () => {
    const response = await request(index).post("/users").send({
      username: "username",
      password: "password"
    })
    expect(response.statusCode).toBe()
  })

const apolloServer = await startServer();
const { query, mutate } = createTestClient({
  apolloServer,
});