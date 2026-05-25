const { User } = require('../models/User.model.js');

const createUser = async (name) => {
  try {
    return await User.create({
      name,
    });
  } catch (e) {
    throw new Error(e.message);
  }
};

const getUsers = async () => {
  try {
    return await User.findAll({
      attributes: ['id', 'name'],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUserById = async (id) => {
  try {
    return await User.findByPk(id, {
      attributes: ['id', 'name'],
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUserById = async (id) => {
  try {
    return await User.destroy({ where: { id } });
  } catch (error) {
    throw new Error(error.message);
  }
};

const patchUserById = async (id, name) => {
  try {
    return await User.update(
      { name },
      {
        where: {
          id,
        },
      },
    );
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  deleteUserById,
  patchUserById,
};
