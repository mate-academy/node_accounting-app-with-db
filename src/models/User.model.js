'use strict';

const { sequelize } = require('../db.js');
const { DataTypes } = require('sequelize');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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

const getUsers = async () => {
  // eslint-disable-next-line
  return await User.findAll();
};

const getUser = async (id) => {
  // eslint-disable-next-line
  return await User.findByPk(+id);
};

const createUser = async (name) => {
  // eslint-disable-next-line
  return await User.create({ name });
};

const deleteUser = async (id) => {
  // eslint-disable-next-line
  return await User.destroy({
    where: { id },
  });
};

const updateUser = async (id, name) => {
  // eslint-disable-next-line
  return await User.update(
    { name },
    {
      where: { id: Number(id) },
      returning: true,
    },
  );
};

const usersList = async () => {
  // eslint-disable-next-line
  return await getUsers();
};

module.exports = {
  User,
  usersList,
  getUsers,
  createUser,
  getUser,
  deleteUser,
  updateUser,
};
