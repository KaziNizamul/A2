const express = require('express');
const cors = require('cors');
const productRouter = require('./src/routes/Product');

/* server init */
const server = express();

/* use server to */
server.use(cors()); // implement cors
server.use(express.json()); // parse json

/* routes */
server.use('/', productRouter.router);

/* listen to server */
server.listen(80, () => {
  console.log('✅ server started')
})