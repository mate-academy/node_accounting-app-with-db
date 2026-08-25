const User = require('../models/User.model.js').User;

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

async function update({ id, ...changes }) {
  const [, [user]] = await User.update(changes, {
    where: { id },
    returning: true,
  });

  return user || null;
}

const usersService = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};

module.exports = { usersService };
