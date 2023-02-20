import signUpSchema from "../schemas/users-schemas.js";
import { NextFunction, Request, Response } from "express";
import signUpRepository from "../repositories/signUp-repository.js";

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
  try{
   const userExists = await signUpRepository.findEmail(email);
   if(userExists){
    return res.status(409).send({message: "Esse email já está cadastrado!"});
   }
  }catch(err){
    res.status(422).send(err.message);
   }
   res.locals.user = { email, password}
   next();
}

const middlewareSignUp = {
  validateSignUp
}

export default middlewareSignUp;