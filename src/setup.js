'use strict';

const { User } = require('./models/User');
const { Expense } = require('./models/Expense');
const { sequelize } = require('./db');

const setup = async() => {
  sequelize();

  await User.sync({ force: true });
  await Expense.sync({ force: true });
};

setup();
