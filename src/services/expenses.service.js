'use strict';

const { DataTypes, Op } = require('sequelize');
const { sequelize } = require('../db/db');

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
    type: DataTypes.STRING,
    allowNull: false,
  },
  amount: {
    type: DataTypes.FLOAT,
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
  updatedAt: false,
  createdAt: false,
});

const getExpenses = (userId, from, to, categories) => {
  const query = {
    where: {},
  };

  if (userId) {
    query.where.userId = userId;
  }

  if (categories) {
    query.where.category = categories;
  }

  if (from && to) {
    query.where.date = {
      [Op.between]: [from, to],
    };
  } else if (from) {
    query.where.date = {
      [Op.gte]: from,
    };
  } else if (to) {
    query.where.date = {
      [Op.lte]: to,
    };
  }

  return Expense.findAll(query);
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = (expenseData) => {
  return Expense.create({
    ...expenseData,
  });
};

const update = (id, dataToUpdate) => {
  return Expense.update({ ...dataToUpdate }, {
    where: { id },
  });
};

const remove = (id) => {
  return Expense.destroy({
    where: { id },
  });
};

module.exports = {
  getExpenses,
  getById,
  create,
  update,
  remove,
  Expense,
};
