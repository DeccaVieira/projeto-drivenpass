import express from 'express';

const server = express();

server.get('/teste', (req, res) => {
  res.send('teste ok');
})

server.listen(4000, () => {
  console.log("Server running in port 4000")
})
