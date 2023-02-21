import { Request, Response } from "express";
import bcrypt from "bcrypt";
import signUpService from "../services/signUp-service.js";

async function signUp(req: Request, res: Response) {
  const { email, password} = res.locals.user;

  const hashPassword = bcrypt.hashSync(password, 10);

  try{
    await signUpService.createUser(email, hashPassword);
    res.sendStatus(201);
  } catch (error) {
    console.log(error);
    return res.status(409).send(error);
  }
}

const signUpController = {
  signUp
}

export default signUpController;
