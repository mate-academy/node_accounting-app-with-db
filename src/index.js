/* eslint-disable no-console */

import { createServer } from './createServer.js';
import { sequelize } from './utils/db.js';

const PORT = process.env.PORT || 3001;

async function startServer() {
  try {
    const app = await createServer();

    await sequelize.authenticate();
    console.log('Connection has been established successfully.');

    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Unable to connect to the database:', error.message);
  }
}

startServer();
