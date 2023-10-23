'use strict';

const { sequelize } = require('../utils/db');
const { DataTypes } = require('sequelize');

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

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const createUser = async(user) => {
  const newUser = await User.create(user);

  return newUser;
};

const removeUser = async(id) => {
  await User.destroy({ where: { id } });
};

const updateUser = async(id, name) => {
  const updatedUser = await User.update(
    { name },
    { where: { id } }
  );

  return updatedUser;
};

module.exports = {
  getAll,
  getUserById,
  createUser,
  removeUser,
  updateUser,
  User,
};
