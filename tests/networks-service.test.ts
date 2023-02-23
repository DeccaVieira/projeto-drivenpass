import supertest from "supertest";
import server from "../src/app.js";

const api = supertest(server);

describe('Create Network', () => {
  it("Should respond with status 404 when user does not exist", async ()=> {
    await api.post('/networks').send({
      
    })
  })
})