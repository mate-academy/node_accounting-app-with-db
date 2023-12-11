'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('./database.service');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
});

const normalizeUser = ({ id, name }) => {
  return {
    id, name,
  };
};

const getAll = async() => {
  const result = await User.findAll();

  return result;
};

const getOne = async(userId) => {
  const result = await User.findByPk(userId);

  return result;
};

const create = async(name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const remove = async(userId) => {
  await User.destroy({ where: { id: userId } });
};

const update = async(userId, newName) => {
  await User.update({ name: newName }, { where: { id: userId } });

  const updatedUser = await getOne(userId);

  return updatedUser;
};

module.exports = {
  User,
  getAll,
  getOne,
  create,
  remove,
  update,
  normalizeUser,
};
