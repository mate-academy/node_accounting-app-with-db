'use strict';

const sequelize = require('../db');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

const getAllUsers = async() => {
  const result = await User.findAll();

  return result;
};

const getUsersById = async(id) => {
  return User.findByPk(id);
};

const createUser = async(name) => {
  const newUser = {
    id: Math.floor(Math.random() * 10000),
    name,
  };

  return User.create(newUser);
};

const removeUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async({ id, name }) => {
  await User.update({ name },
    { where: { id } });
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  removeUser,
  updateUser,
  // clearUsers,
};
