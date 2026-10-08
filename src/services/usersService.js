'use strict';

const { User } = require('../models/User.model');

const createUser = (user) => {
  return User.create(user);
};

const findUsers = () => {
  return User.findAll();
};

const getUserId = (user) => {
  return User.findByPk(user);
};

const patchUser = async (id, userBody) => {
  const userId = await getUserId(id);

  if (!userId) {
    return null;
  } else {
    await User.update(userBody, {
      where: {
        id: id,
      },
      silent: true,
    });

    const updateUser = await getUserId(id);

    return updateUser;
  }
};

const deleteUser = async (id) => {
  const userId = await getUserId(id);

  if (!userId) {
    return null;
  } else {
    return User.destroy({ where: { id: id } });
  }
};

module.exports = {
  createUser,
  findUsers,
  getUserId,
  patchUser,
  deleteUser,
};
