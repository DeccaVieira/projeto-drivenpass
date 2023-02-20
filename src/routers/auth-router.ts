import { Router } from "express";
import { login } from "../controllers/auth-controller";

const authRouter = Router();

authRouter.post("/sign-in", login);

export {authRouter};