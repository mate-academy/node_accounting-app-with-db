'use strict';

const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.NUMBER,
    primaryKey: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    primaryKey: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    field: 'spend_at',
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'expensees',
  updatedAt: false,
});

async function getAll(userId, category, from, to) {
  let expenses = await Expense.findAll();

  if (userId) {
    expenses = [expenses.find(expense => expense.userId === +userId)];
  }

  if (from && to) {
    expenses = expenses.filter(
      expense => expense.spentAt >= from && expense.spentAt <= to,
    );
  }

  if (category) {
    expenses = expenses.filter(expense => expense.category === category);
  }

  return expenses;
};

function addOne(
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
) {
  const newExpense = {
    id: Math.floor(Math.random() * 100),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  Expense.create(newExpense);
};

async function getOne(expenseId) {
  const expenses = await Expense.findAll();
  const foundExpense = expenses
    .find(expense => expense.dataValues.id === +expenseId);

  return foundExpense;
}

async function deleteOne(expenseId) {
  await Expense.destroy({
    where: {
      id: expenseId,
    },
    force: true,
  });
}

async function updateOne(expenseId, title) {
  const updatedUser = await Expense.update({ title }, {
    where: {
      id: expenseId,
    },
  });

  return updatedUser;
}

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
