import { createServer } from './createServer.js';
import { setupDatabase } from './utils/setupDb.js';

setupDatabase();

createServer()
  .listen(3000, () => {
    // eslint-disable-next-line no-console
    console.log('Server is running on http://localhost:3000');
  });
