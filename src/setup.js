const { Expense } = require('./models/Expense.model');
const { User } = require('./models/User.model');

const setup = async () => {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
  process.exit();
};

setup();
