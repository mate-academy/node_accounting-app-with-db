'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db.js');

const Expense = sequelize.define(
  'Expense',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      get() {
        const rawValue = this.getDataValue('id');

        return parseInt(rawValue, 10);
      },
    },
    userId: {
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('userId');

        return parseInt(rawValue, 10);
      },
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
      type: DataTypes.BIGINT,
      allowNull: false,
      get() {
        const rawValue = this.getDataValue('amount');

        return parseFloat(rawValue);
      },
    },
    category: {
      type: DataTypes.STRING,
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: 'expenses',
    updatedAt: false,
    createdAt: false,
  },
);

async function getExpenses({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = {
      [Op.in]: categories,
    };
  }

  if (from) {
    where.spentAt = {
      ...where.spentAt,
      [Op.gte]: new Date(from),
    };
  }

  if (to) {
    where.spentAt = {
      ...where.spentAt,
      [Op.lte]: new Date(to),
    };
  }

  return Expense.findAll({ where });
}

async function addExpense({ userId, spentAt, title, amount, category, note }) {
  const newExpense = {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  return Expense.create(newExpense);
}

async function getExpense(id) {
  return Expense.findByPk(id);
}

async function deleteExpense(id) {
  await Expense.destroy({
    where: {
      id,
    },
  });
}

async function updateExpense(id, props) {
  await Expense.update(
    { ...props },
    {
      where: {
        id,
      },
    },
  );

  return getExpense(id);
}

module.exports = {
  Expense,
  getExpenses,
  addExpense,
  getExpense,
  deleteExpense,
  updateExpense,
};
