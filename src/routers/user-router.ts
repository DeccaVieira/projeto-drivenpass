import { Router } from "express";
import signUpController from "../controllers/user-controllers.js";
import middlewareSignUp from "../middlewares/signUp-middleware.js";

const userRouter = Router();

userRouter.post("/cadastro", middlewareSignUp.validateSignUp, signUpController.signUp);

export default userRouter;