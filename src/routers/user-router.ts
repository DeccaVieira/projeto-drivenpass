import { Router } from "express";

import { createUserSchema } from "../schemas/users-schemas";

const userRouter = Router();

userRouter.post("/cadastro")