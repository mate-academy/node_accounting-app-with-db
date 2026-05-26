'use strict';

const { DataTypes } = require('sequelize');
const { sequelize } = require('../db.js');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

function createUsersService() {
  return {
    async getAll() {
      return User.findAll();
    },

    async create(name) {
      const user = await User.create({ name });

      return user;
    },

    async getById(id) {
      const user = await User.findByPk(id);

      return user;
    },

    async deleteById(id) {
      const user = await User.findByPk(id);

      await User.destroy({
        where: {
          id,
        },
      });

      return user;
    },

    async updateById({ id, name }) {
      await User.update(
        { name },
        {
          where: {
            id,
          },
          silent: true,
        },
      );

      const user = await User.findByPk(id);

      return user;
    },
  };
}

module.exports = {
  User,
  createUsersService,
};
