'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

function getAll() {
  return User.findAll();
}

function getById(userId) {
  return User.findByPk(userId);
}

function addUser(name) {
  return User.create({ name });
}

function remove(userId) {
  return User.destroy({
    where: { userId },
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
  addUser,
  remove,
  update,
  User,
};
