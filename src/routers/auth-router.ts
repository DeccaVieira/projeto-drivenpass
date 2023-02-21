import { Router } from "express";
import signInCont from "../controllers/auth-controller.js";
import signInMiddleware from "../middlewares/signIn-middleware.js";
const authRouter = Router();

authRouter.post("/entrar", signInMiddleware.validateSignIn, signInCont.signInController);

export {authRouter};