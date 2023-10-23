'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../database/db');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.BIGINT,
    primaryKey: true,
    allowNull: false,
  },
  userId: {
    type: DataTypes.BIGINT,
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
    allowNull: true,
  },
}, {
  tableName: 'expenses',
  updatedAt: false,
  createdAt: false,
});

const getAll = async() => {
  const expenses = await Expense.findAll();

  return expenses;
};

const getById = async(id) => {
  const expens = await Expense.findByPk(id);

  return expens;
};

const add = async(expense) => {
  const expens = await Expense.create(expense);

  return expens;
};

const update = async(id, data) => {
  const expens = await Expense.update({ data }, { where: { id } });

  return expens;
};

const deleteById = (id) => {
  Expense.destroy(id);
};

module.exports = {
  getAll,
  getById,
  add,
  update,
  deleteById,
};
