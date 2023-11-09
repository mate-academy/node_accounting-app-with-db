'use strict';

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
}, {
  tableName: 'users',
  createdAt: false,
  updatedAt: false,
});

const userService = {
  getAll: () => {
    return User.findAll();
  },
  getById: (id) => {
    return User.findByPk(id);
  },
  addUser: (newUser) => {
    return User.create({
      ...newUser,
    });
  },
  removeUser: (id) => {
    return User.destroy({
      where: {
        id,
      },
    });
  },
  updateUser: (newUserData, id) => {
    return User.update({ ...newUserData }, { where: { id } });
  },
};

module.exports = {
  userService,
};
