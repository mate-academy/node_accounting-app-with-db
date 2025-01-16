const { User } = require('../models/User.model');

const getAllUsers = async () => {
  try {
    const users = await User.findAll();

    return { data: users };
  } catch (error) {
    return { error: 'Failed to get users' };
  }
};

const getUserById = async (id) => {
  try {
    if (!id) {
      return { error: 'Invalid ID' };
    }

    const parsedId = +id;

    const targetUser = await User.findByPk(parsedId);

    if (!targetUser) {
      return { error: 'User not found' };
    }

    return { data: targetUser };
  } catch (error) {
    return { error: 'Failed to get user' };
  }
};

const createUser = async (name) => {
  try {
    if (!name) {
      return { error: 'No user name provided' };
    }

    const newUser = await User.create({ name });

    return { data: newUser };
  } catch {
    return { error: 'Failed to create user' };
  }
};

const deleteUser = async (id) => {
  try {
    if (!id) {
      return { error: 'Invalid ID' };
    }

    const user = await User.findByPk(+id);

    if (!user) {
      return { error: 'User not found' };
    }

    await user.destroy();

    return { data: null };
  } catch {
    return { error: 'Failed to delete user' };
  }
};

const updateUser = async (id, name) => {
  try {
    const normalizedId = +id;
    const user = await User.findByPk(normalizedId);

    if (!user) {
      return { error: 'User not found' };
    }

    await user.update({ name });

    return { data: user };
  } catch {
    return { error: 'Failed to update user' };
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
