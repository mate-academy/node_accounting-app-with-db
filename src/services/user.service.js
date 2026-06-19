const { User } = require('../models/User.model');

const clearUsers = async () => {
  try {
    await User.destroy({ truncate: true });
  } catch {
    return null;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();

    return users;
  } catch {
    return [];
  }
};

const getUser = async (id) => {
  try {
    const user = await User.findByPk(+id);

    return user;
  } catch {
    return null;
  }
};

const deleteUser = async (id) => {
  try {
    const user = await User.destroy({ where: { id: +id } });

    return user;
  } catch {
    return null;
  }
};

const createUser = async (username) => {
  try {
    const user = await User.create({
      name: username,
    });

    return user;
  } catch (e) {
    return null;
  }
};

const updateUser = async (id, { name }) => {
  try {
    const user = await User.update(
      { name },
      {
        where: { id },
        returning: true,
        plain: true,
      },
    );

    return user[1];
  } catch {
    return null;
  }
};

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
  clearUsers,
};
