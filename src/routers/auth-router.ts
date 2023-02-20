import { Router } from "express";
import { login } from "../controllers/auth-controller.js";

const authRouter = Router();

authRouter.post("/sign-in", login);

export {authRouter};