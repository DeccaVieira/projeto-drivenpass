import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../utils/prisma-utils.js";
import siginInRepository from "../repositories/signIn-repository.js";
import { UserSelect } from "../protocols/signIn-protocols.js";
import signInRepository from "../repositories/signIn-repository.js";

async function userLogin(email, password) {
  console.log(email, password, "service");

  if (!email || !password) {
    throw new Error();
  }
  const userExists = await siginInRepository.validateUserExists(email);
  if (!userExists) {
    throw new Error();
  }


  await comparePassword(password, userExists.password);
  const token = await createToken(userExists);

  return {
    user: exclude(userExists, "password"),
    token,
  };
}

async function createToken(userExists) {
console.log(userExists,"teste")
  const token = jwt.sign(
    { id:userExists.id, email: userExists.email } , process.env.JWT_SECRET);
  console.log(token, "token");
  
  return token;
}

async function comparePassword(password: string, userPassword: string) {
  const passwordOk = await bcrypt.compare(password, userPassword);
  if (!passwordOk) throw new Error();
}

const signInService = {
  userLogin,
};
export default signInService;
