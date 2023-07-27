'use strict';

const { User } = require('../models/users.model');

class UserService {
  async findAll() {
    return User.findAll();
  }

  async create(name) {
    return User.create({ name });
  }

  async getById(id) {
    return User.findByPk(id);
  }

  async remove(id) {
    return User.destroy({ where: { id } });
  }

  async update(id, newUser) {
    return User.update(newUser, {
      where: { id },
    });
  }
}

module.exports = { UserService };
