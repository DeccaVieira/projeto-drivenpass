import { Request, Response } from "express";
import signInService from "../services/signIn-service.js";

async function signInController(req:Request, res: Response){
  const { email, password } = res.locals.user;
console.log(email,password);
  try{
await signInService.userLogin(email, password);
    return res.sendStatus(200);
  }
  catch (error) {
    return res.status(422).send({error});
  }
}
 const signInCont = {
  signInController
 };

 export default signInCont;