'use strict';

const model = require('../models/models.js');

function createUserService() {
  const normalizeUser = ({ id, name }) => ({
    id,
    name,
  });

  const getAllUsers = () => {
    return model.models.User.findAll();
  };

  const getUserById = (userId) => {
    return model.models.User.findByPk(userId);
  };

  const createUser = (name) => {
    return model.models.User.create({ name });
  };

  const removeUser = async (userId) => {
    const user = await model.models.User.findByPk(userId);

    if (!user) {
      return false;
    }

    await user.destroy();

    return true;
  };

  const updateUser = async (userId, name) => {
    const user = await model.models.User.findByPk(userId);

    if (!user) {
      return null;
    }

    await user.update({ name });

    return user;
  };

  return {
    normalizeUser,
    getAllUsers,
    getUserById,
    createUser,
    removeUser,
    updateUser,
  };
}

module.exports = createUserService;
