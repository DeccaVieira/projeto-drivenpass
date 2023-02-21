import { Router } from "express";
import credencialRouter from "./credential-router.js";
import userRouter from "./user-router.js";
import { authRouter } from "./auth-router.js";
const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(credencialRouter);

export default router;