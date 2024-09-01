/* eslint-disable no-console */
const { sequelize } = require('./db.js');
// const { User, Expense } = require('./models/models.js');

const sync = async () => {
  await sequelize.sync({ force: true });

  console.log('pieknie');
};

sync();
