'use strict';

const { DataTypes } = require('sequelize');

const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    createdAt: false,
    updatedAt: false,
  },
);

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAllUsers = async () => {
  return User.findAll();
};

const getUserById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const removeUser = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  User,
  normalize,
  createUser,
  getAllUsers,
  getUserById,
  updateUser,
  removeUser,
};
