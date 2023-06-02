'use strict';

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');
const { Expense } = require('../models/expenses');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
  }
);

async function getAll() {
  const result = await User.findAll();

  return result;
}

async function getById(userId) {
  const result = await User.findByPk(userId);

  return result;
}

async function create(name) {
  const result = await User.create({ name });

  return result;
}

async function changeById(userId, fieldToChange) {
  const user = await User.findByPk(userId);
  const result = await user.update({ ...fieldToChange });

  return result;
}

async function deleteById(userId) {
  return sequelize.transaction(async(t) => {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: [userId],
        },
      },
      transaction: t,
    });

    await Expense.destroy({
      where: {
        userId: {
          [Op.eq]: [userId],
        },
      },
      transaction: t,
    });
  });
}

module.exports = {
  getAll,
  getById,
  create,
  changeById,
  deleteById,
  User,
};
