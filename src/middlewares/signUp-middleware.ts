import signUpSchema from "../schemas/users-schemas.js";
import { NextFunction, Request, Response } from "express";

async function validateSignUp(req: Request, res: Response, next: NextFunction) {
  const {email, password, confirmPassword} = req.body;

  if(password !== confirmPassword || !confirmPassword){
    return res.sendStatus(409);
  }

  const { error } = signUpSchema.validate(req.body, { abortEarly: false });
  if (error) {
    const errors = error.details.map((detail) => detail.message);
    return res.status(422).send({ errors });
  }
  try{
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