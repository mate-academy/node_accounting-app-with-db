'use strict';

const { sequelize } = require('../db/db.js');
const { DataTypes } = require('sequelize');

const Expense = sequelize.define('User', {
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  spentAt: {
    type: DataTypes.STRING,
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
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  note: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  tableName: 'expenses',
});

const normalize = ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
});

const getAll = async() => {
  const result = await Expense.findAll({
    order: [['createdAt', 'DESC']],
  });

  return result;
};

const getById = async(id) => {
  const result = await Expense.findByPk(+id);

  return result;
};

const create = async(expense) => {
  const result = await Expense.create({
    ...expense,
  });

  return result;
};

const update = async(id, body) => {
  await Expense.update(body, { where: { id } });
};

const remove = async(id) => {
  const result = await Expense.destroy({
    where: { id },
  });

  return result;
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  Expense,
  normalize,
};
