'use strict';

const { v4: uuid } = require('uuid');
const { sequelize } = require('../utils/client.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    allowNull: false,
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
  const users = await User.findAll({
    attributes: ['id', 'name'],
    order: [
      ['created_at', 'ASC'],
    ],
  });

  return users.map(user => user.dataValues);
}

async function getUser(userId) {
  const user = await User.findOne({
    attributes: ['id', 'name'],
    where: {
      id: userId,
    },
  });

  return user.dataValues;
}

async function addUser(name) {
  const id = uuid();

  const newUser = await User.create({
    id,
    name,
  }, {
    returning: ['id', 'name'],
  });

  return newUser.dataValues;
}

function removeUser(userId) {
  return User.destroy({
    where: {
      id: userId,
    },
  });
}

async function updateUser(userId, name) {
  await User.update({ name }, {
    where: {
      id: userId,
    },
    returning: true,
  });

  return getUser(userId);
}

module.exports = {
  addUser,
  getUser,
  removeUser,
  updateUser,
  getAll,
};
