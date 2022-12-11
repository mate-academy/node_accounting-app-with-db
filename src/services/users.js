'use strict';

const { User } = require('../data/models/users');

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

  async removeOne(id) {
    const isDeleted = await User.destroy({
      where: {
        id,
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
