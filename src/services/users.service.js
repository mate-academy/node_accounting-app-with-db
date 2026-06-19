const { User } = require('../models/User.model');

function normalize({ id, name }) {
  return { id, name };
}

async function getUsers() {
  return User.findAll();
}

async function createUser(name) {
  return User.create({ name });
}

async function getUser(id) {
  return User.findByPk(id);
}

async function removeUser(id) {
  await User.destroy({
    where: {
      id,
    },
  });
}

async function updateUser(id, name) {
  await User.update(
    { name },
    {
      where: { id },
    },
  );
}

module.exports = {
  normalize,
  getUsers,
  createUser,
  getUser,
  removeUser,
  updateUser,
};
