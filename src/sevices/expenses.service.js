'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

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

const getAll = async() => {
  const data = await Expense.findAll();

  return data;
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const create = async({ userId, amount, category, note, title, spentAt }) => {
  return Expense.create(
    {
      userId,
      title,
      spentAt,
      amount,
      category,
      note,
    });
};

const update = async(id, body) => {
  await Expense.update({ body }, { where: { id } });
};

const remove = async(id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  Expense,
};
