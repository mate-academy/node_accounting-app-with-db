const {
  models: { User },
} = require('../models/models');

async function getAll() {
  const users = await User.findAll();

  return users;
}

async function getById(id) {
  return User.findByPk(id);
}

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

async function removeById(id) {
  await User.destroy({
    where: { id },
  });
}

async function updateById({ id, name }) {
  const user = await getById(id);

  if (!user) {
    return;
  }

  await User.update({ name }, { where: { id } });

  const updatedUser = await getById(id);

  return updatedUser;
}

const clear = async () => {
  await User.destroy({ truncate: true });
};

const userService = {
  getAll,
  getById,
  create,
  removeById,
  updateById,
  clear,
};

module.exports = {
  userService,
};
