import express from 'express';
import { login } from './controllers/auth-controller.js';

const server = express();

server.get('/teste',login)

server.listen(4000, () => {
  console.log("Server running in port 4000...")
})
