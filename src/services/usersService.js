'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../dataBase');
const { v4: uuidv4 } = require('uuid');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.STRING,
    primaryKey: true,
    allowNull: false,
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
  const res = await User.findAll();

  return res;
};

const getUserById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const createNewUser = async(name) => {
  const newUser = {
    id: uuidv4(),
    name,
  };

  return User.create(newUser);
};

const deleteUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const upgradeUser = async({ id, name }) => {
  await User.update({ name },
    { where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  upgradeUser,
};
