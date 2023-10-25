/* eslint-disable max-len */
/* eslint-disable no-console */
'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const Users = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
}, {
});

Users.sync();

const getUsers = async() => {
  try {
    const users = await Users.findAll();

    return {
      users,
    };
  } catch (error) {
    return {
      success: false, error: error.message,
    };
  }
};

const getUser = async(userId) => {
  try {
    const user = await Users.findByPk(userId);

    if (user) {
      return {
        success: true, data: user,
      };
    } else {
      return {
        success: false, error: 'User not found',
      };
    }
  } catch (error) {
    return {
      success: false, error: error.message,
    };
  }
};

Users.sync();

const addNewUser = (user) => {
  return Users.create(user).catch((error) => {
    console.log('Unable to create User', error);
  });
};

const deleteOneUser = async(id) => {
  try {
    await Users.destroy({
      where: {
        id: id,
      },
    });
  } catch (error) {
    return {
      success: false, error: error.message,
    };
  }
};
const updateUserName = async(index, name) => Users.update({ name }, { where: { id: index } });

const usersService = {
  getUsers,
  getUser,
  addNewUser,
  deleteOneUser,
  updateUserName,
};

module.exports = {
  usersService,
};
