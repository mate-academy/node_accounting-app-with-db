/* eslint-disable no-inner-declarations */
/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db');

const User = require('./models/User.model');
const Expense = require('./models/Expense.model');

User.hasMany(Expense, { foreignKey: 'userId' });
Expense.belongsTo(User, { foreignKey: 'userId' });

if (require.main === module) {
  (async () => {
    try {
      sequelize.sync({ alter: true });
      console.log('Database synchronized');

      const server = createServer().listen(0, () => {
        const { port } = server.address();

        console.log(`Server is running on http://localhost:${port}/`);
      });

      function cleanUp() {
        server.close(async () => {
          await sequelize.close();
          process.exit(0);
        });
      }

      process.on('SIGTERM', cleanUp);
      process.on('SIGINT', cleanUp);

      process.on('unhandledRejection', (err) => {
        console.error(err);
        cleanUp();
      });

      process.on('uncaughtException', (err) => {
        console.error(err);
        cleanUp();
      });
    } catch (err) {
      process.exit(1);
    }
  })();
}

module.exports = { createServer };
