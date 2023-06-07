'use strict';

const { DataTypes, Op } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'users',
  updatedAt: false,
});

const getAllUsers = async() => {
  const result = await User.findAll();

  return result;
};

const getUserById = async(userId) => {
  const result = await User.findByPk(userId);

  return result;
};

const createUser = async(name) => {
  const result = await User.create({ name });

  return result;
};

const updateUser = async(userId, name) => {
  const user = await User.findByPk(userId);
  const result = await user.update({ ...name });

  return result;
};

const removeUser = async(userId) => {
  return sequelize.transaction(async(t) => {
    await User.destroy({
      where: {
        id: {
          [Op.eq]: [userId],
        },
      },
      transaction: t,
    });
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
  User,
};
