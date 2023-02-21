import { Router } from "express";
import signInCont from "../controllers/auth-controller.js";
import signInMiddleware from "../middlewares/signIn-middleware.js";
const authRouter = Router();

authRouter.post("/sign-in", signInMiddleware.validateSignIn, signInCont.signInController);

export {authRouter};