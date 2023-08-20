import 'dotenv/config';

import { sequelize } from './utils/db.js';
import { User } from './models/User.js';
import { Expense } from './models/Expense.js';

// export const setupNewDatabase = async () => {
//   await sequelize.sync({ force: true });
// };

// setupNewDatabase().then(() => {
//   console.log('Database setup complete');
// });

export const setupDatabase = async() => {
  await sequelize.sync({ force: true });

  await User.create({ name: 'John' });
  await User.create({ name: 'Jane' });
  await User.create({ name: 'Bob' });

  await Expense.create({
    userId: 1,
    spentAt: '2021-08-19',
    title: 'Lunch',
    amount: 1000,
    category: 'Food',
    note: 'Burger and fries',
  });

  await Expense.create({
    userId: 1,
    spentAt: '2021-08-19',
    title: 'Books',
    amount: 2000,
    category: 'Education',
  });

  await Expense.create({
    userId: 2,
    spentAt: '2021-08-19',
    title: 'Lunch',
    amount: 1000,
    category: 'Food',
    note: 'Burger and fries',
  });
};

setupDatabase().then(() => {
  /* eslint-disable-next-line no-console */
  console.log('Database setup complete');
});
