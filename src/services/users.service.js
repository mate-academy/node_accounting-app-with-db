'use strict';

const { DataTypes } = require('sequelize');
const sequelize = require('./../database');

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

const getAllUsers = async() => {
  const result = await User.findAll();

  return result;
};

const getUserById = (id) => User.findByPk(id);

const addNewUser = async(name) => {
  const lastUser = await User.findOne({
    attributes: ['id'],
    order: [['id', 'DESC']],
  });

  const getNewUserId = lastUser ? lastUser.id + 1 : 0;

  const newUser = {
    id: getNewUserId,
    name,
  };

  User.create(newUser);
};

const removeUser = (id) => {
  User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async(id, name) => {
  await User.update({
    name,
  }, {
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  addNewUser,
  removeUser,
  updateUser,
};
