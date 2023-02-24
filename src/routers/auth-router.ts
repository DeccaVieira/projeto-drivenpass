import { Router } from "express";
import signInCont from "../controllers/auth-controller";
import signInMiddleware from "../middlewares/signIn-middleware";
const authRouter = Router();

authRouter.post("/sign-in", signInMiddleware.validateSignIn, signInCont.signInController);

export {authRouter};