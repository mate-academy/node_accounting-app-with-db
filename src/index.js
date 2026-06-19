/* eslint-disable no-console */

'use strict';

import { createServer } from './createServer.js';

const PORT = 5700;
const app = createServer();

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
