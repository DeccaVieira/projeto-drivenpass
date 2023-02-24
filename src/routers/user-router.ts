import { Router } from "express";
import signUpController from "../controllers/user-controllers";
import middlewareSignUp from "../middlewares/signUp-middleware";

const userRouter = Router();

userRouter.post("/sign-up", middlewareSignUp.validateSignUp, signUpController.signUp);

export default userRouter;