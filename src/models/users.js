'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db.js');

const UserModel = sequelize.define('UserModel', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNul: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

function getUsers() {
  return UserModel.findAll();
}

function getUserById(userId) {
  return UserModel.findByPk(userId);
}

function createUser(name) {
  return UserModel.create({ name });
}

function removeUser(userId) {
  return UserModel.destroy({
    where: { id: userId },
  });
}

function updateUser({ id, name }) {
  return UserModel.update({ name }, {
    where: { id },
  });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  UserModel,
};
