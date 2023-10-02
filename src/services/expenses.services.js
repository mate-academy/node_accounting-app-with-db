/* eslint-disable space-before-function-paren */
'use strict';

const { sequelize } = require('../database/db');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('Expense', {
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
    allowNull: true,
  },
}, {
  tableName: 'expenses',
});

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const getAllExpenses = async () => {
  return Expense.findAll({
    order: [['createdAt', 'DESC']],
  });
};

const getByIdExpense = async (id) => {
  return Expense.findByPk(id);
};

const getByQueryExpenses = async (query) => {
  const {
    from,
    to,
    userId,
    categories,
  } = query;

  const expenses = await getAllExpenses();

  return expenses
    .filter(expense => {
      const userIdMatch = userId
        ? expense.userId === userId
        : true;

      const categoryMatch = categories
        ? categories.includes(expense.category)
        : true;

      const datesMatch = (from && to)
        ? expense.spentAt >= from && expense.spentAt <= to
        : true;

      return userIdMatch && categoryMatch && datesMatch;
    });
};

const createExpense = async ({
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  const expense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create({ ...expense });
};

const updateExpense = async (id, paramToUpdate) => {
  await Expense.update({
    ...paramToUpdate,
  }, { where: { id } });
};

const deleteExpense = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getAllExpenses,
  getByIdExpense,
  getByQueryExpenses,
  createExpense,
  updateExpense,
  deleteExpense,
  Expense,
  normalize,
};
