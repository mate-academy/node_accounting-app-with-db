'use strict';

const sequelize = require('../utils/db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.NUMBER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    field: 'created_at',
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'users',
  updatedAt: false,
});

async function getAll() {
  const result = await User.findAll();

  return result;
};

function addOne(name) {
  const newUser = {
    id: Math.floor(Math.random()),
    name,
  };

  User.create(newUser);

  return newUser;
};

async function getOne(userId) {
  const users = await User.findAll();
  const foundUser = users.find(user => user.dataValues.id === +userId);

  return foundUser;
};

async function deleteOne(userId) {
  await User.destroy({
    where: {
      id: userId,
    },
    force: true,
  });
};

async function updateOne(userId, name) {
  const updatedUser = await User.update({ name }, {
    where: {
      id: userId,
    },
  });

  return updatedUser;
};

module.exports = {
  getAll,
  addOne,
  getOne,
  deleteOne,
  updateOne,
};
