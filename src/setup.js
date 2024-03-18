const {
  models: { User, Expense },
} = require('./models/models');

const setup = async () => {
  await User.sync({ force: true });
  await Expense.sync({ force: true });
};

setup();
