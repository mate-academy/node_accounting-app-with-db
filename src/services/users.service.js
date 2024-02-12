'use strict';

const { User } = require('../models/User.model');

class UsersSequelizeService {
  async getUsers() {
    const users = await User.findAll();

    return users;
  };

  async createUser(name) {
    const newUser = await User.create({ name });

    return newUser;
  };

  async getUserById(id) {
    const numId = +id;
    const foundUser = await User.findByPk(numId);

    return foundUser;
  };

  async removeUserById(id) {
    const numId = +id;

    await User.destroy({ where: { id: numId } });
  };

  async updateUser(oldUser, newParams) {
    const id = +oldUser.id;
    const newUser = {
      ...oldUser,
      ...newParams,
      id,
    };

    await User.create(newParams, { where: { id } });

    return newUser;
  };

  normalize({ id, name }) {
    return {
      id, name,
    };
  };
};

const usersService = new UsersSequelizeService();

module.exports = {
  usersService,
};
