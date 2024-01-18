'use strict';

const { v4: uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');
const { sequelize } = require('../dataBase');

const Expenses = sequelize.define('Expenses', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.TEXT,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  note: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAllExpenses = async({ userId, categories, from, to }) => {
  let allExpenses = await Expenses.findAll();

  if (categories) {
    allExpenses = allExpenses.filter(
      expense => categories.includes(expense.category)
    );
  }

  if (userId) {
    allExpenses = allExpenses.filter(
      expense => expense.userId === +userId
    );
  }

  if (from && to) {
    allExpenses = allExpenses.filter(
      item => item.spentAt > from && item.spentAt < to);
  }

  return allExpenses;
};

const getExpenseById = async(id) => {
  const expense = await Expenses.findByPk(id);

  return expense;
};

const createExpense = async({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const newExpense = {
    id: uuidv4(),
    userId,
    spentAt,
    title,
    amount,
    category,
    note: note || '',
  };

  return Expenses.create(newExpense);
};

const updateExpense = async({
  id,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expenseToUpdate = await getExpenseById(id);

  if (spentAt) {
    await Expenses.update(spentAt, { where: { id } });
  }

  if (title) {
    await Expenses.update(title, { where: { id } });
  }

  if (amount) {
    await Expenses.update(amount, { where: { id } });
  }

  if (category) {
    await Expenses.update(category, { where: { id } });
  }

  if (note) {
    await Expenses.update(note, { where: { id } });
  }

  return expenseToUpdate;
};

const removeExpense = async(id) => {
  await Expenses.destroy({
    where: {
      id,
    },
  });

  return true;
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
