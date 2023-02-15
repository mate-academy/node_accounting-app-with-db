'use strict';

const { User } = require('../database/usersDb');

const normalize = ({ name, id }) => ({
  name,
  id,
});

const getAll = async() => {
  const usersFromDb = await User.findAll();

  return usersFromDb.map(normalize);
};

const addUser = async(name) => {
  const createdUser = await User.create({ name });

  return createdUser;
};

const getUser = async(userId) => {
  const foundUser = await User.findByPk(userId);

  return normalize(foundUser);
};

const deleteUser = async(userId) => {
  const wasUserDeleted = await User.destroy({
    where: {
      id: userId,
    },
  });

  if (!wasUserDeleted) {
    throw new Error('can\'t find a user');
  }
};

const updateUser = async(userId, fieldToUpdate) => {
  const wasUserUpdated = await User.update(fieldToUpdate, {
    where: {
      id: userId,
    },
  });

  if (!wasUserUpdated[0]) {
    throw new Error('can\'t find a user');
  }
};

const resetUsers = () => {
  User.sync({ force: true });
};

module.exports = {
  getAll,
  addUser,
  getUser,
  deleteUser,
  resetUsers,
  updateUser,
};
