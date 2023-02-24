import * as jwt from "jsonwebtoken";
import { User } from "@prisma/client";
import { createUser } from "./factories/user-factory";
import prisma from "config/database";

export async function cleanDb(){
  // await prisma.user.deleteMany({});
  // await prisma.credential.deleteMany({});
  // await prisma.network.deleteMany({});
}