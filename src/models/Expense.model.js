'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.FLOAT,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);
// eslint-disable-next-line
const getExpenses = async () => await Expense.findAll();
// eslint-disable-next-line
const getExpenseById = async (id) => await Expense.findByPk(+id);

const createExpense = async ({
  userId,
  title,
  amount,
  category,
  note,
  spentAt,
}) =>
  // eslint-disable-next-line
  await Expense.create({ userId, title, amount, category, note, spentAt });

const updateExpense = async (id, { userId, title, amount, category, note }) => {
  // eslint-disable-next-line
  return await Expense.update(
    {
      userId,
      title,
      amount,
      category,
      note,
    },
    { where: { id }, returning: true },
  );
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

module.exports = {
  Expense,
  getExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  deleteExpense,
};
