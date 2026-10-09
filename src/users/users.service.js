const { User } = require('../models/User.model.js');

async function getAll() {
  return User.findAll();
}

async function getById(id) {
  return User.findByPk(id);
}

async function create({ name }) {
  const user = await User.create({
    name,
  });

  return user;
}

async function update(id, changes) {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  if (changes.name !== undefined) {
    user.name = changes.name;
  }

  await user.save();

  return user;
}

async function remove(id) {
  const deleteCount = await User.destroy({ where: { id } });

  return deleteCount > 0;
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
