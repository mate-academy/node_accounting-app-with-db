'use strict';

const { Expense } = require('./models/Expense');
const { User } = require('./models/User');
const { sequelize } = require('./utils/db.js');

function reset() {
  return () => {
    User.sync({ force: true });
    Expense.sync({ force: true });
  };
}

async function connect() {
  try {
    await sequelize.authenticate();
  } catch (error) {
    throw new Error();
  }
}

connect()
  .then(reset)
  .finally(() => {
    sequelize.close();
  });
