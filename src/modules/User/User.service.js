'use strict';

const { Sequelize, DataTypes } = require('sequelize');

const sequelize = new Sequelize('postgres', 'postgres', 'Qwer1Asdf2__', {
  host: 'localhost',
  dialect: 'postgres',
});

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

class UserService {
  static async getAll() {
    const users = await User.findAll();

    return users;
  }

  static async getById(id) {
    const user = await User.findByPk(id);

    return user;
  }

  static async create(name) {
    const id = Math.trunc(Math.random() * 1000000);

    return User.create({
      id, name,
    });
  }

  static async update(userId, userName) {
    await User.update({ name: userName }, { where: { id: userId } });
  }

  static async delete(userId) {
    const deleted = await User.destroy({ where: { id: userId } });

    return !!deleted;
  }

  static normalize({ id, name }) {
    return {
      id, name,
    };
  }
};

module.exports = { UserService };
