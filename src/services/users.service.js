const { User } = require('../models/User.model');

async function getAll() {
  const data = await User.findAll({ order: [['id', 'asc']] });

  return data;
}

async function getOne(id) {
  const data = await User.findByPk(+id);

  return data;
}

async function addUser(name) {
  const data = await User.create({ name });

  return data;
}

async function deleteUser(id) {
  const data = await User.destroy({ where: { id } });

  return data;
}

async function updateUser(id, data) {
  await User.update(data, {
    where: { id },
  });

  return { id: +id, ...data };
}

module.exports = {
  getAll,
  getOne,
  addUser,
  deleteUser,
  updateUser,
};
