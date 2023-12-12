'use strict';

const { DataTypes } = require('sequelize');
const { Op } = require('sequelize');

const { sequelize } = require('./database.service');

const Expense = sequelize.define('Expense', {
  userId: {
    type: DataTypes.INTEGER,
    field: 'user_id',
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.DATE,
    field: 'spent_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  note: {
    type: DataTypes.STRING,
  },
}, {
  tableName: 'expenses',
});

const normalizeExpense
  = ({ id, userId, spentAt, title, amount, category, note }) => {
    return {
      id, userId, spentAt, title, amount, category, note,
    };
  };

const getByQuery = async(searchQuery) => {
  const where = {};

  if (searchQuery.id) {
    where.id = searchQuery.id;
  }

  if (searchQuery.userId) {
    where.userId = searchQuery.userId;
  }

  if (searchQuery.categories) {
    where.category = searchQuery.categories;
  }

  if (searchQuery.from || searchQuery.to) {
    where.spentAt = {};

    if (searchQuery.from) {
      where.spentAt[Op.gt] = searchQuery.from;
    }

    if (searchQuery.to) {
      where.spentAt[Op.lt] = searchQuery.to;
    }
  }

  const result = await Expense.findAll({ where });

  return result;
};

const create = async(userId, spentAt, title, amount, category, note = null) => {
  const newExpense = await Expense.create({
    userId, spentAt, title, amount, category, note,
  });

  return newExpense;
};

const remove = async(expenseId) => {
  await Expense.destroy({ where: { id: expenseId } });
};

const update = async(expenseId, newData) => {
  const seekedExpense = await Expense.findOne({ where: { id: expenseId } });

  seekedExpense.set({ ...newData });
  await seekedExpense.save();

  return seekedExpense;
};

module.exports = {
  Expense,
  getByQuery,
  create,
  remove,
  update,
  normalizeExpense,
};
