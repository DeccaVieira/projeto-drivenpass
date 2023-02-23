import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { exclude } from "../../utils/prisma-utils.js";
import siginInRepository from "../../repositories/signIn-repository.js";
import { UserSelect } from "../../protocols/signIn-protocols.js";
import signInErrors from "./errors.js";

async function userLogin(email, password) {
  if (!email || !password) {
    throw signInErrors.emailAndPasswordRequired();
  }
  const userExists = await siginInRepository.validateUserExists(email);

  if (!userExists) {
    throw signInErrors.userDoesNotExist();
  }
  await comparePassword(password, userExists.password);
  const token = await createToken(userExists);

  return {
    user: exclude(userExists, "password"),
    token,
  };
}

async function createToken(userExists) {
  const token = jwt.sign(
    { id: userExists.id, email: userExists.email },
    process.env.JWT_SECRET
  );
  return token;
}

async function comparePassword(password: string, userPassword: string) {
  const passwordOk = await bcrypt.compare(password, userPassword);
  if (!passwordOk) {
    throw signInErrors.wrongEmailOrPassword()
  };
}

const signInService = {
  userLogin,
};
export default signInService;
