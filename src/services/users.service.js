'use strict';

const { sequelize } = require('../connectDb');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.BIGINT,
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

const getAll = async() => {
  const users = await User.findAll({
    order: ['id'],
  });

  return users;
};

const add = async(user) => {
  await User.create(user);

  return user;
};

const getById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const remove = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateById = async(id, name) => {
  await User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  add,
  getById,
  remove,
  updateById,
  User,
};
