/* eslint-disable no-console */

'use strict';
require('./models/models.js');

const { createServer } = require('./createServer.js');

createServer().listen(5700, () => {});
