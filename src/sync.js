/* eslint-disable no-console */
const { sequelize } = require('./db.js');
// const { User, Expense } = require('./models/models.js');

const sync = async () => {
  await sequelize.sync();
  // await User.sync();
  // await Expense.sync();

  console.log('pieknie');
};

sync();
