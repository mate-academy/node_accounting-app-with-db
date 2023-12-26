/* eslint-disable no-console */
'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('../db');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
  },

  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
  createdAt: false,
});

const getUsers = async() => {
  return User.findAll();
};

const getUserById = async(id) => {
  const normalizedId = parseInt(id);

  return User.findByPk(normalizedId);
};

const createUser = async(name) => {
  try {
    const lastUser = await User.findOne({
      attributes: ['id'],
      order: [['id', 'DESC']],
    });

    const getMaxId = lastUser ? lastUser.id : 0;

    const user = {
      id: getMaxId + 1,
      name,
    };

    return User.create(user);
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

const deleteUser = async(id) => {
  const normalizedId = parseInt(id);

  return User.destroy({
    where: {
      id: normalizedId,
    },
  });
};

const updateUser = async({ id, name }) => {
  return User.update({ name: name }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
