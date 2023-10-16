'use strict';

const { sequelize } = require('../setup/db');

const { DataTypes } = require('sequelize');

const Expenses = sequelize.define('Expense', {
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
  timestamps: false,
});

const getAll = async() => {
  const data = await Expenses.findAll();

  return data;
};

const add = async(expense) => {
  const data = await Expenses.create({
    ...expense,
  });

  return data;
};

const getById = async id => {
  const data = await Expenses.findByPk(+id);

  return data;
};

const remove = async id => {
  await Expenses.destroy({
    where: { id },
  });
};

const update = async(id, requestBody) => {
  const data = await Expenses.update({ ...requestBody }, {
    where: { id },
  });

  if (!data) {
    return;
  }

  return getById(id);
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  update,
  Expenses,
};
