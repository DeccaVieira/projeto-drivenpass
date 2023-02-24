import bcrypt from "bcrypt";
import {faker} from "@faker-js/faker";
import { User } from "@prisma/client";
import prisma from "config/database";
import supertest from "supertest";
import server from "app";

export async function createUser(pass = undefined){
  
const user ={
  email: faker.internet.email(),
  password: pass || faker.internet.password(),
}
 await prisma.user.create({
  data:{ ...user, password : bcrypt.hashSync(user.password, 10)}
  });
  return user
};

export async function createUserfromNetwork(pass = undefined){
  
  const user ={
    email: faker.internet.email(),
    password: pass || faker.internet.password(),
  }
   const id = await prisma.user.create({
    data:{ ...user, password : bcrypt.hashSync(user.password, 10)}
    });
    return {...user, id: id.id}
  };

export async function createNetwork(user: number){
  
  const data = {
    title: faker.internet.password(),
    network: faker.internet.password(),
    password:faker.internet.password(),
    userId: user
  }
   return await prisma.network.create({
    data 
    });
    
  };

  export async function createCredential(user: number){
  
    const data = {
      title: faker.internet.password(),
      url: faker.internet.password(),
      username: faker.internet.password(),
      password:faker.internet.password(),
      userId: user
    }
     return await prisma.credential.create({
      data 
      });
 
    };
  

const app = supertest(server);
export async function createToken(){
  const pass = faker.internet.password(10);
  const user = await createUser(pass);

  const response = await app.post("/sign-in").send({email:user.email, password:user.password});
return response.text
}


