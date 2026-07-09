'use strict';

const { DataTypes, Op } = require('sequelize');

const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    spentAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    category: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    createdAt: false,
    updatedAt: false,
  },
);

const normalize = ({ id, spentAt, title, amount, userId, category, note }) => ({
  id,
  spentAt,
  title,
  amount: Number(amount),
  userId,
  ...(category !== null && { category }),
  ...(note !== null && { note }),
});

const getAllExpenses = async (filters = {}) => {
  const where = {};

  if (filters.userId) {
    where.userId = filters.userId;
  }

  if (filters.from || filters.to) {
    where.spentAt = {};

    if (filters.from) {
      where.spentAt[Op.gte] = filters.from;
    }

    if (filters.to) {
      where.spentAt[Op.lte] = filters.to;
    }
  }

  if (filters.categories) {
    where.category = {
      [Op.in]: filters.categories.split(','),
    };
  }

  return Expense.findAll({
    where,
    order: [['spentAt', 'ASC']],
  });
};

const getExpenseById = async (id) => {
  return Expense.findByPk(id);
};

const createExpense = async ({
  userId,
  title,
  amount,
  category,
  spentAt,
  note,
}) => {
  return Expense.create({
    userId,
    title,
    amount,
    category,
    spentAt,
    note,
  });
};

const updateExpense = async (id, data) => {
  await Expense.update(data, { where: { id } });
};

const removeExpense = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  Expense,
  normalize,
  getAllExpenses,
  getExpenseById,
  createExpense,
  updateExpense,
  removeExpense,
};
