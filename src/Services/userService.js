const { User } = require('../models/User.model');

const userService = {
  async getAll() {
    return User.findAll();
  },

  async getById(id) {
    return User.findByPk(Number(id));
  },

  async create(name) {
    return User.create({ name });
  },

  async update(id, name) {
    return User.update({ name }, { where: { id } });
  },

  async delete(id) {
    return User.destroy({ where: { id } });
  },

  async reset() {
    return User.destroy();
  },
};

module.exports = userService;
