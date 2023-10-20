'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../dataBase/db');

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
});

const getAll = async() => {
  const users = await User.findAll();

  return users;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const add = (user) => {
  return User.create(user);
};

const remove = id => {
  User.destroy({ where: { id } });
};

const update = async(id, name) => {
  const updatedUser = await User.update(
    { name },
    { where: { id } }
  );

  return updatedUser;
};

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
};
