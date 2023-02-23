import express from 'express';
import router from './routers/router.js';
import cors from 'cors';
import dotenv from "dotenv";
import { loadEnv } from '../config/envs.js';
loadEnv();

const server = express();
server
  .use(cors())
  .use(express.json())
  .use(router);
server.listen(4000, () => {
  console.log("Server running in port 4000...")
})

export default server;