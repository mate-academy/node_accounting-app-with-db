'use strict';

const { User } = require('../models/User');

class UserService {
  async getUsers() {
    const users = await User.findAll({ order: ['createdAt'] });

    return users;
  }

  async addUser(name) {
    const user = await User.create({ name });

    return user;
  }

  async getUserById(userId) {
    const user = await User.findByPk(Number(userId));

    return user;
  }

  deleteUser(userId) {
    return User.destroy({
      where: { id: Number(userId) },
    });
  }

  async updateUser(userId, name) {
    const user = await User.update({ name }, {
      where: { id: Number(userId) },
    });

    return user;
  }
}

const usersService = new UserService();

module.exports = { usersService };
