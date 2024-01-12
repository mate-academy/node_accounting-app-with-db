/* eslint-disable no-console */
'use strict';

const { createServer } = require('./createServer');

const PORT = 3003;

createServer().listen(PORT);

console.log(`Server is listening on port ${PORT}`);
