/* eslint-disable no-console */

'use strict';

require('dotenv').config();

const { createServer } = require('./createServer');
const { sequelize } = require('./db');
const { models } = require('./models/models');

async function startServer() {
  try {
    models.User.hasMany(models.Expense, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
    models.Expense.belongsTo(models.User, { foreignKey: 'userId' });

    await sequelize.authenticate();

    await sequelize.sync({ alter: true });

    const app = createServer();

    app.listen(5700, () => {
      console.log('Server is running on http://localhost:5700');
    });
  } catch (err) {
    console.error('Failed to start server:', err);
    process.exit(1);
  }
}

startServer();
