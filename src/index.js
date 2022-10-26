'use strict';

const { createServer } = require('./createServer');

const port = 3000;
const server = createServer();

server.listen(port);
