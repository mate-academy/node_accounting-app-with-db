'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db');
const { Expense } = require('../services/expenses');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

function getAll() {
  return User.findAll({
    order: [
      'createdAt',
    ],
  });
}

function getById(userId) {
  return User.findByPk(userId);
}

function create(name) {
  return User.create({
    name,
  });
}

async function remove(userId) {
  return sequelize.transaction(async(t) => {
    await User.destroy({
      where: {
        id: userId,
      },
      transaction: t,
    });

    await Expense.destroy({
      where: {
        userId,
      },
      transaction: t,
    });
  });
}

function update({ id, name }) {
  return User.update({ name }, {
    where: { id },
  });
}

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
  User,
  normalize,
};
