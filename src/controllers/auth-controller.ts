import { Request, Response } from "express";

function login(req:Request, res: Response){

const name = req.body;
const newUser = name;
console.log("a");

res.send(newUser);
}

export {
  login
}