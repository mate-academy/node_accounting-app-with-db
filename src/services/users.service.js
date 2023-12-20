'use strict';

const { sequelize } = require('../db');
const { uuidv4 } = require('uuid');
const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
},
{
  tableName: 'users',
});

const normalize = (user) => {
  const { id, name } = user;

  return {
    id, name,
  };
};
const getAllUsers = async() => {
  return User.findAll({
    order: ['name'],
  });
};
const getUserById = (id) => {
  return User.findByPk(id);
};

const addUser = (name) => {
  const id = uuidv4();

  return User.create({
    id, name,
  });
};

const updateUser = async(user) => {
  const { id, name } = user;

  return User.update({ name }, { where: { id } });
};

const deleteUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  }
  );
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  normalize,
  User,
};
