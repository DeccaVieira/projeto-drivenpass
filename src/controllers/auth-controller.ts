import { Request, Response } from "express";

function login(req:Request, res: Response){

const name = req.query;
const newUser = name;
res.send(newUser);
}

export {
  login
}