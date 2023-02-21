import { Router } from "express";

import userRouter from "./user-router.js";
import { authRouter } from "./auth-router.js";
const router = Router();

router.use(userRouter);
router.use(authRouter);


export default router;