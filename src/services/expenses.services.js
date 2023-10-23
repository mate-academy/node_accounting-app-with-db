'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    allowNul: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    allowNul: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNul: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNul: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNul: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAll = async(query) => {
  const expenses = await Expense.findAll({
    where: query,
  });

  return expenses;
};

const getExpenseById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const createExpense = async(expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const removeExpense = async(id) => {
  await Expense.destroy(id);
};

const updateExpense = async(id, body) => {
  const expense = await Expense.update(
    body,
    { where: { id } }
  );

  return expense;
};

module.exports = {
  getAll,
  getExpenseById,
  createExpense,
  removeExpense,
  updateExpense,
  Expense,
};
