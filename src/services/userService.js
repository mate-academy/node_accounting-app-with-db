'use strict';

const { User } = require('../models/User.model');

const userService = {
  async createUser({ name }) {
    const newUser = await User.create({ name });

    return newUser;
  },

  async getAllUsers(filters = {}) {
    const where = {};

    if (filters.id) {
      where.id = filters.id;
    }

    if (filters.name) {
      where.name = filters.name;
    }

    const users = await User.findAll({ where });

    return users;
  },

  async updateUser(id, { name }) {
    const user = await User.findByPk(id);

    if (user) {
      user.name = name;
      await user.save();

      return user;
    }

    return null;
  },

  async deleteUser(id) {
    const result = await User.destroy({ where: { id } });

    return result > 0;
  },
};

module.exports = userService;
