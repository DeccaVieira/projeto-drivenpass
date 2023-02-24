import signInSchema from "../schemas/users-schemas";
import { NextFunction, Request, Response } from "express";

export async function validateSignIn(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const { email, password } = req.body;

  try {
    const { error } = signInSchema.validate(req.body, { abortEarly: false });
    if (error) {
      const errors = error.details.map((detail) => detail.message);
      return res.status(422).send({ errors });
    }
  } catch (err) {
    console.log(err);
    return res.sendStatus(422);
  }
  res.locals.user = { email, password };
  next();
}

const signInMiddleware = {
  validateSignIn
}
export default signInMiddleware;
