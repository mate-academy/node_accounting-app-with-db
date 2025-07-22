const { User } = require('../models/User.model');

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
  return User.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, name }) {
  const userToUpdate = await getById(id);

  if (!userToUpdate) {
    return;
  }

  const updatedNumber = await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return updatedNumber[0];
}

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
