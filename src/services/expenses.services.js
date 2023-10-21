'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../dataBase/db');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
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
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

const getAll = async(query) => {
  const expenses = await Expense.findAll({
    where: query,
  });

  return expenses;
};

const getById = async(id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const add = async(expense) => {
  const newExpense = await Expense.create(expense);

  return newExpense;
};

const remove = async(id) => {
  await Expense.destroy(id);
};

const update = async(id, body) => {
  const expense = await Expense.update(
    body,
    { where: { id } }
  );

  return expense;
};

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
};
