'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Expense = sequelize.define('Expense', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
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
    allowNull: true,
  },
}, {
  tableName: 'expenses_board',
  updatedAt: false,
  createdAt: false,
});

Expense.sync({ force: true });

const getAll = async() => Expense.findAll();

const getById = async(id) => Expense.findByPk(id);

const add = async(expense) => Expense.create(expense);

const updateById = async(id, body) => Expense.update(body, { where: { id } });

const remove = async(id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  add,
  updateById,
  remove,
};
