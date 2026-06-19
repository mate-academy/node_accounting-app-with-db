const { models } = require('../models/models');

async function emptyUsers() {
  await models.User.destroy({
    truncate: true,
  });
}

async function getAll() {
  return models.User.findAll();
}

async function getById(id) {
  const foundUsers = await models.User.findAll({
    where: {
      id,
    },
  });

  return foundUsers[0];
}

async function create(name) {
  return models.User.create({ name });
}

async function deleteById(id) {
  await models.User.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, name }) {
  await models.User.update(
    {
      name,
    },
    {
      where: {
        id,
      },
    },
  );

  const updatedUser = await getById(id);

  return updatedUser;
}

const userRepository = {
  emptyUsers,
  getAll,
  getById,
  create,
  deleteById,
  update,
};

module.exports = userRepository;
