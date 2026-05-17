/* eslint-disable no-return-await */
const { User } = require('../models/User.model');

const usersService = {
  async getUsers() {
    return await User.findAll();
  },

  async reset() {
    await User.destroy({ where: {} });
  },

  async createUser(name) {
    return await User.create({ name });
  },

  async getUser(id) {
    return await User.findByPk(id);
  },

  async deleteUser(id) {
    const deleted = await User.destroy({ where: { id } });

    return deleted > 0;
  },

  async updateUser(id, name) {
    const [updatedRows] = await User.update({ name }, { where: { id } });

    if (updatedRows === 0) {
      return null;
    }

    return await User.findByPk(id);
  },
};

module.exports = {
  usersService,
};
