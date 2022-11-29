'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../utils/db');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'Users',
  createdAt: false,
  updatedAt: false,
});

User.sync();

class UsersService {
  async createUser(name) {
    const user = await User.create({ name });

    return user;
  }

  async getAll() {
    const users = await User.findAll();

    return users;
  }

  async getOne(userId) {
    const user = await User.findByPk(userId);

    return user;
  }

  async removeOne(userId) {
    const isDeleted = await User.destroy({
      where: {
        id: userId,
      },
    });

    return isDeleted;
  }

  async modifyUser(userId, name) {
    await User.update({ name }, {
      where: {
        id: userId,
      },
    });
  }
}

const usersService = new UsersService();

module.exports = { usersService };
