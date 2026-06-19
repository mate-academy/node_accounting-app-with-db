/* eslint-disable no-console */
'use strict';

const { sequelize } = require('../db.js');
const { User } = require('../models/User.model.js');
const { Expense } = require('../models/Expense.model.js');

const seedData = async () => {
  try {
    await sequelize.sync({ force: true });

    const users = await User.bulkCreate(
      [{ name: 'John Doe' }, { name: 'Jane Smith' }, { name: 'Alice Brown' }],
      { returning: true },
    );

    console.log('Sample users have been added to the database!');

    const expenses = [
      {
        userId: users[0].id,
        spentAt: new Date(),
        title: 'Groceries',
        amount: 100,
        category: 'Food',
        note: 'Weekly grocery shopping',
      },
      {
        userId: users[1].id,
        spentAt: new Date(),
        title: 'Electricity Bill',
        amount: 60,
        category: 'Utilities',
        note: 'September electricity bill',
      },
      {
        userId: users[2].id,
        spentAt: new Date(),
        title: 'Gym Membership',
        amount: 50,
        category: 'Fitness',
        note: 'Monthly gym subscription',
      },
    ];

    await Expense.bulkCreate(expenses);

    console.log('Sample expenses have been added to the database!');
  } catch (error) {
    console.error('Error while adding data:', error);
  } finally {
    await sequelize.close();
  }
};

seedData();
