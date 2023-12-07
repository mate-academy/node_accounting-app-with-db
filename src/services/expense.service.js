'use strict';

const sequelize = require('./db');
const { DataTypes, Op } = require('sequelize');

const Expense = sequelize.define('Expense', {
  spentAt: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.NUMBER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
});

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
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

const getAllExpenses = async({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = +userId;
  }

  if (categories) {
    where.category = categories;
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [new Date(from), new Date(to)],
    };
  }

  const newExpenses = await Expense.findAll({
    where,
  });

  return newExpenses;
};

const createExpense = (payload) => {
  return Expense.create({ ...payload });
};

const getExpense = (id) => {
  return Expense.findByPk(id);
};

const deleteExpense = async(id) => {
  await Expense.destroy({ where: { id } });
};

const updateExpense = async({ id, payload }) => {
  await Expense.update({ ...payload }, { where: { id } });
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpense,
  deleteExpense,
  updateExpense,
  Expense,
  normalize,
};
