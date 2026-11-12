const { User } = require('./models/User.model');
const { Expense } = require('./models/Expense.model');
const { sequelize } = require('./db');

const setup = async () => {
  await sequelize.sync({ force: true });
  // eslint-disable-next-line no-console
  console.log('Database synchronized');
};

setup().catch((error) => {
  // eslint-disable-next-line no-console
  console.error(error);
  process.exit(1);
});

module.exports = { User, Expense };
