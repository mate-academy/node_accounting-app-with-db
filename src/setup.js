const {
  models: { User, Expense },
} = require('./models/models');
const { sequelize } = require('./db');

const setup = async () => {
  await sequelize.sync({ force: true });

  await User.bulkCreate([
    { name: 'John Doe' },
    { name: 'Jane Doe' },
    { name: 'John Smith' },
  ]);

  await Expense.bulkCreate([
    {
      userId: 1,
      spentAt: '2022-10-19T11:01:43.462Z',
      title: 'Buy a new laptop',
      amount: 999,
      category: 'Electronics',
      note: 'I need a new laptop',
    },
    {
      userId: 1,
      spentAt: '2022-10-19T11:01:43.462Z',
      title: 'Buy a new TV',
      amount: 999,
      category: 'Electronics',
      note: 'I need a new TV',
    },
  ]);

  await sequelize.close();
};

setup();
