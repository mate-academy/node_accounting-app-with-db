'use strict';

const { User } = require('../database/users.db.js');

const usersService = {
  normalize: ({ id, name }) => {
    return {
      id, name,
    };
  },
  getAll: () => {
    return User.findAll({
      order: ['createdAt'],
    });
  },
  getById: (userId) => {
    return User.findByPk(userId);
  },
  create: (name) => {
    return User.create({
      name,
    });
  },
  remove: (userId) => {
    return User.destroy({
      where: { id: userId },
    });
  },
  update: (userId, name) => {
    return User.update({ name }, {
      where: {
        id: userId,
      },
    });
  },
};

module.exports = {
  usersService,
};
