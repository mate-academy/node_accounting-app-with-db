'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
      get() {
        // had to add this, because tests expect id to be a number
        const rawValue = this.getDataValue('id');

        return parseInt(rawValue);
      },
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: 'users',
    updatedAt: false,
    createdAt: false,
  },
);

async function getUsers() {
  return User.findAll();
}

async function addUser(name) {
  const newUser = await User.create({ name });

  return newUser;
}

async function getUser(id) {
  return User.findByPk(id);
}

async function deleteUser(id) {
  await User.destroy({
    where: {
      id,
    },
  });
}

async function updateUser(id, { name }) {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return getUser(id);
}

module.exports = {
  User,
  getUsers,
  addUser,
  getUser,
  deleteUser,
  updateUser,
};
