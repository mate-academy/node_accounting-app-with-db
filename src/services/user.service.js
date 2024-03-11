'use strict';

const userRepository = require('../repositories/user.repository');

class UserService {
  constructor(repository) {
    this.repository = repository;
  }

  async create(data) {
    return this.repository.create(data);
  }

  async getAll() {
    return this.repository.findAll();
  }

  async getById(id) {
    return this.repository.findById(id);
  }

  async update(id, data) {
    return this.repository.update(id, data);
  }

  async remove(id) {
    return this.repository.remove(id);
  }
}

module.exports = new UserService(userRepository);
