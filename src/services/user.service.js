'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./../database');

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

    const newUser = {
      id: getMaxId + 1,
      name,
    };

    return User.create(newUser);
  } catch (error) {
    throw error;
  }
};

const removeUser = async(id) => {
  const normalizedId = parseInt(id);

  return User.destroy({
    where: {
      id: normalizedId,
    },
  });
};

const updateUser = async(name, id) => {
  return User.update({ name }, {
    where: {
      id,
    },
  });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
