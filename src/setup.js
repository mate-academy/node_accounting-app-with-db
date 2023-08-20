import 'dotenv/config';

import { sequelize } from './utils/db.js';
import { User } from './models/User.js';
import { Expense } from './models/Expense.js';
import { Category } from './models/Category.js';

export const setupDatabase = async () => {
  await sequelize.sync({ force: true });

  await User.create({ name: 'John' });
  await User.create({ name: 'Jane' });
  await User.create({ name: 'Bob' });

  await Category.create({ name: 'Food' });
  await Category.create({ name: 'Education' });
  await Category.create({ name: 'Transportation' });
  await Category.create({ name: 'Entertainment' });

  await Expense.create({
    userId: 1,
    spentAt: '2021-08-19',
    title: 'Lunch',
    amount: 1000,
    categoryId: 1,
    note: 'Burger and fries',
  });

  await Expense.create({
    userId: 1,
    spentAt: '2022-08-19',
    title: 'Books',
    amount: 2000,
    categoryId: 2,
  });

  await Expense.create({
    userId: 2,
    spentAt: '2023-08-19',
    title: 'Lunch',
    amount: 1000,
    categoryId: 1,
    note: 'Burger and fries',
  });
};

setupDatabase().then(() => {
  /* eslint-disable-next-line no-console */
  console.log('Database setup complete');
});
