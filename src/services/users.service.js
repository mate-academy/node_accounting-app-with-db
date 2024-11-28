const { User } = require('../models/User.model');

async function getAll() {
  const users = await User.findAll();

  return users;
}

async function resetAllUsers() {
  await User.destroy({ cascade: true, truncate: true });
}

async function getUserById(id) {
  const user = await User.findByPk(id);

  if (!user) {
    throw new Error('User not found');
  }

  return user;
}

async function create(user) {
  if (!user.name) {
    throw new Error('Name is required');
  }

  const newUser = await User.create(user);

  return newUser;
}

async function update(id, user) {
  const affectedRows = await User.update(
    { ...user, updateAt: new Date() },
    {
      where: {
        id,
      },
    },
  );

  if (affectedRows[0] === 0) {
    throw new Error('User not found');
  }

  const updatedUser = await User.findByPk(id);

  return updatedUser;
}

async function remove(id) {
  const userToRemove = await User.findByPk(id);

  if (!userToRemove) {
    throw new Error('User not found');
  }

  await userToRemove.destroy({ force: true });

  return userToRemove;
}

module.exports = {
  getAll,
  getUserById,
  create,
  update,
  remove,
  resetAllUsers,
};
