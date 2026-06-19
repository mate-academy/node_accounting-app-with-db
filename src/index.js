/* eslint-disable no-unused-vars */
/* eslint-disable no-console */

'use strict';

const { createServer } = require('./createServer');
const { sequelize } = require('./db.js');
const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
    await sequelize.sync({ force: true });
    console.log('Database synced');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

testConnection().then(() => {
  createServer().listen(5700, () => {
    console.log('Server is running on localhost:5700');
  });
});
