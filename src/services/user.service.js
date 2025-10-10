const { v4: uuidv4 } = require('uuid');
const { User } = require('../models/models');

async function getAll() {
  return User.findAll();
}

async function getSingle(id) {
  return User.findByPk(id);
}

async function create(name) {
  const id = uuidv4();

  return User.create({ id, name });
}

async function remove(id) {
  await User.destroy({ where: { id } });
}

async function update({ id, name }) {
  return User.update({ name }, { where: { id } });
}

module.exports = {
  userService: {
    getAll,
    getSingle,
    create,
    remove,
    update,
  },
};
