import { Router } from "express";
import credencialRouter from "./credential-router";
import userRouter from "./user-router";
import { authRouter } from "./auth-router";
import networkRouter from "./network-router";
const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(credencialRouter);
router.use(networkRouter);
export default router;
