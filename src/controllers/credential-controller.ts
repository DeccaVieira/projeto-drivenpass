import { Request, Response } from "express";
import {AuthenticatedRequest} from "../middlewares/authentication-middleware.js";

async function postCredential(req: AuthenticatedRequest, res: Response){
  const { title, url, username, password} = req.body;
  const {userId} = req;
}
