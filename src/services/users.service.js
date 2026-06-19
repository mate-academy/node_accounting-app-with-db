const { User } = require('./../models/User.model');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

function create(name) {
  return User.create({
    name: name,
  });
}

async function remove(id) {
  await User.destroy({ where: { id } });
}

async function update({ id, name }) {
  await User.update({ name }, { where: { id } });

  const updatedUser = await getById(id);

  return updatedUser;
}

const userService = {
  getAll,
  getById,
  create,
  remove,
  update,
};

module.exports = {
  userService,
};
