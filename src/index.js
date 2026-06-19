/* eslint-disable no-console */

'use strict';

import { createServer } from './createServer.js';

createServer().listen(5700, () => {
  console.log('Server is running on localhost:5700');
});
