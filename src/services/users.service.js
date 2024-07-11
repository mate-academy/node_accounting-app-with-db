const { User } = require('../models/User.model');

const initUsers = async () => {
  try {
    await User.sync({ force: true });
  } catch (error) {
    throw new Error();
  }
};
const getAllUsers = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw new Error();
  }
};

const getUserById = async (id) => {
  try {
    return await User.findByPk(id);
  } catch (error) {
    throw new Error();
  }
};

const createUser = async (name) => {
  try {
    return await User.create({ name });
  } catch (error) {
    throw new Error();
  }
};

const updateUser = async (id, name) => {
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
    throw new Error();
  }
};

const deleteUser = async (id) => {
  try {
    return await User.destroy({
      where: {
        id,
      },
    });
  } catch (error) {
    throw new Error();
  }
};

module.exports = {
  initUsers,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
