import express from 'express';
import { login } from './controllers/auth-controller.js';
import { authRouter } from './routers/auth-router.js';
import cors from 'cors';

const server = express();
server
  .use(cors())
  .use(express.json())
  .use(authRouter);

server.listen(4000, () => {
  console.log("Server running in port 4000...")
})
