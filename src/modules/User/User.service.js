'use strict';

const { User } = require('./user.model');

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
