const { User } = require('../models/User.model');

async function getUsers() {
  return User.findAll();
}

async function getUserById(id) {
  return User.findByPk(id);
}

async function createUser({ name }) {
  return User.create({ name });
}

async function updateUser({ id, name }) {
  const userToUpdate = await getUserById(id);

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

async function deleteUser(id) {
  return User.destroy({
    where: {
      id,
    },
  });
}

async function reset() {
  await User.destroy({ where: {} });
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  reset,
};
