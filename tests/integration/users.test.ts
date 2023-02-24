import server, { init } from "app";
import prisma from "config/database";
import { faker } from "@faker-js/faker";
import supertest from "supertest";
import {
  createNetwork,
  createToken,
  createUser,
  createUserfromNetwork,
} from "../factories/user-factory";
import { cleanDb } from "../helpers";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

beforeAll(async () => {
  await init();
  await cleanDb();
});
afterAll(disconnect);

const app = supertest(server);

describe("POST /sign-up", () => {
  it("should respond with status 409 when there is an user with given email", async () => {
    const user = await createUser();

    const response = await app
      .post("/sign-up")
      .send({ ...user, confirmPassword: user.password });

    expect(response.status).toBe(409);
  });

  it("should respond with status 422 when there is an user with given email", async () => {
    const response = await app.post("/sign-up").send({});

    expect(response.status).toBe(422);
  });

  describe("When body is valid", () => {
    it("should respond with status 201 when body is valid", async () => {
      const response = await app.post("/sign-up").send({
        email: faker.internet.email(),
        password: "Lorenzoooo",
        confirmPassword: "Lorenzoooo",
      });

      expect(response.status).toBe(201);
    });
  });
});

describe("POST /sign-in", () => {
  it("should respond with status 422 when there is an user with given email", async () => {
    const response = await app.post("/sign-in").send({});

    expect(response.status).toBe(422);
  });

  it("should respond with status 422 when email or password is wrong", async () => {
    const user = await createUser();

    const response = await app
      .post("/sign-in")
      .send({ ...user, password: "bolinhaaaaa" });

    expect(response.status).toBe(422);
  });

  it("should respond with status 401 when user does not exist", async () => {
    const user = await createUser();

    const response = await app
      .post("/sign-in")
      .send({ ...user, email: "bolinhaaaaa@dog.com" });

    expect(response.status).toBe(401);
  });

  describe("When body is valid", () => {
    it("should respond with status 200 when email and password is valid", async () => {
      const pass = faker.internet.password(10);
      const user = await createUser(pass);

      const response = await app
        .post("/sign-in")
        .send({ email: user.email, password: user.password });

      expect(response.status).toBe(200);
    });
  });
});
describe("POST /networks", () => {
  it("should respond with status 200 when token is valid", async () => {
    const token = await createToken();

    const response = await app
      .post("/networks")
      .send({
        title: faker.internet.password(),
        network: faker.internet.password(),
        password: faker.internet.password(),
      })
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should respond with status 200 when token is valid", async () => {
    const pass = faker.internet.password(10);
    const user = await createUserfromNetwork(pass);
    const token = await createToken();
    const network = await createNetwork(user.id);
    const response = await app
      .get("/networks")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(200);
  });

  it("should respond with status 404 when token is valid but network Id does not exist", async () => {
    const pass = faker.internet.password(10);
    const user = await createUserfromNetwork(pass);
    const token = await createToken();
    const network = await createNetwork(user.id);
    const response = await app
      .delete("/networks/0")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });


  it("should respond with status 404 when token is valid but network Id does not exist", async () => {
    const pass = faker.internet.password(10);
    const user = await createUserfromNetwork(pass);
    const token = await createToken();
    const network = await createNetwork(user.id);
    const response = await app
      .delete(`/networks/${network.id}`)
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });


  it("should respond with status 404 when token is valid but network Id does not exist", async () => {
    const pass = faker.internet.password(10);
    const user = await createUserfromNetwork(pass);
    const token = await createToken();
    const network = await createNetwork(user.id);
    const response = await app
      .get("/networks/0")
      .set("Authorization", `Bearer ${token}`);

    expect(response.status).toBe(404);
  });

  it("should respond with status 401 when token is invalid", async () => {
    const token_fake = jwt.sign(
      { id: 0, email: faker.internet.email() },
      process.env.JWT_SECRET
    );

    const response = await app
      .get("/networks")
      .send({
        title: faker.internet.password(),
        network: faker.internet.password(),
        password: faker.internet.password(),
      })
      .set("Authorization", `Bearer ${token_fake}`);

    expect(response.status).toBe(401);
  });

  it("should respond with status 401 when token is invalid", async () => {
    const token_fake = jwt.sign(
      { id: 0, email: faker.internet.email() },
      process.env.JWT_SECRET
    );

    const response = await app
      .post("/networks")
      .send({
        title: faker.internet.password(),
        network: faker.internet.password(),
        password: faker.internet.password(),
      })
      .set("Authorization", `Bearer ${token_fake}`);

    expect(response.status).toBe(401);
  });
});



async function disconnect() {
  await prisma.$disconnect();
}
