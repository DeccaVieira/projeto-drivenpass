import { Router } from "express";
import credencialRouter from "./credential-router.js";
import userRouter from "./user-router.js";
import { authRouter } from "./auth-router.js";
import networkRouter from "./network-router.js";
const router = Router();

router.use(userRouter);
router.use(authRouter);
router.use(credencialRouter);
router.use(networkRouter);
export default router;