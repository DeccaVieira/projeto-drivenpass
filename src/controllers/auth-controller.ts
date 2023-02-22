import { Request, Response } from "express";
import signInService from "../services/signIn-service.js";

async function signInController(req:Request, res: Response){
  const { email, password } = res.locals.user;

  try{
const set = await signInService.userLogin(email, password);

    return res.status(200).send(set.token);

  }
  catch (error) {
    return res.status(422).send({error});
  }
}
 const signInCont = {
  signInController
 };

 export default signInCont;