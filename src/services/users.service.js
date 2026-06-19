'use strict';

const { User } = require('../models/User.model');

function createUsersService() {
  function getAll() {
    return User.findAll();
  }

  function getById(id) {
    return User.findByPk(id);
  }

  function create(name) {
    return User.create({ name });
  }

  function deleteById(id) {
    return User.destroy({ where: { id } });
  }

  async function update({ id, name }) {
    await User.update({ name }, { where: { id } });

    return User.findByPk(id);
  }

  return {
    getAll,
    getById,
    create,
    deleteById,
    update,
  };
}

module.exports = {
  createUsersService,
};
