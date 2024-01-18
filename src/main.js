/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');

const PORT = 5000;

createServer().listen(PORT);

console.log(`Server is listening on port ${PORT}`);
