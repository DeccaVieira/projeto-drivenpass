import signUpSchema from "../src/schemas/users-schemas";
import { NextFunction, Request, Response } from "express";

async function validateSignUp(req: Request, res: Response, next: NextFunction) {
  const {email, password} = req.body;

  if( !email || !password ){
    return res.status(422).send({message: "Por favor, preencha todos os campos corretamente!"})
  }
  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
}

const middlewareSignUp = {
  validateSignUp
}

export default middlewareSignUp;