/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

// createServer().listen(5700, () => {
//   console.log('Server is running on localhost:5700');
// });

const PORT = process.env.PORT || 5700;

(async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('✅ Database synchronized');

    const app = createServer();

    app.listen(PORT, () => {
      console.log(`🚀 Server is running on http://localhost:${PORT}`);
    });
  } catch (err) {
    console.error('❌ Failed to start server:', err);
    process.exit(1);
  }
})();
