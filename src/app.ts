import express from 'express';
import router from './routers/router.js';
import cors from 'cors';
import dotenv from "dotenv";

dotenv.config();
const server = express();
server
  .use(cors())
  .use(express.json())
  .use(router);
server.listen(4000, () => {
  console.log("Server running in port 4000...")
})
