'use strict';

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const Expense = sequelize.define(
  'Expense',
  {
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
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
      type: DataTypes.INTEGER,
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
  },
  {
    tableName: 'expenses',
    updatedAt: false,
  }
);

async function getAll({ userId, categories, from, to }) {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: [categories] };
  }

  if (from && to) {
    where.spentAt = { [Op.between]: [from, to] };
  }

  return Expense.findAll({
    where,
    order: ['id'],
  });
}

async function getById(expenseId) {
  const result = await Expense.findByPk(expenseId);

  return result;
}

async function create(expense) {
  const result = await Expense.create({ ...expense });

  return result;
}

async function changeById(expenseId, fieldToChange) {
  const expense = await Expense.findByPk(expenseId);
  const result = await expense.update({ ...fieldToChange });

  return result;
}

async function deleteById(expenseId) {
  const result = await Expense.destroy({
    where: {
      id: {
        [Op.eq]: [expenseId],
      },
    },
  });

  return result;
}

module.exports = {
  getAll,
  getById,
  create,
  changeById,
  deleteById,
  Expense,
};
