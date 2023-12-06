'use strict';

const { User } = require('../db/models/user.model');

const userService = {
  getAll: () => User.findAll({ order: ['id'] }),
  getById: (id) => User.findByPk(id),
  create: (name) => User.create({ name }),
  delete: (id) => User.destroy({ where: { id } }),
  update: (id, fields) =>
    User.update(fields, {
      where: { id },
      returning: true,
    }),

  normalize: ({ id, name }) => ({
    id,
    name,
  }),
};

module.exports = userService;
