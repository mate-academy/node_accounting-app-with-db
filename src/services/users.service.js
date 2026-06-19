/* eslint-disable no-console */
const { User } = require('../models/User.model');

async function getAllUsers() {
  try {
    const users = await User.findAll({ order: ['name'] });

    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw new Error('Failed to retrieve users.');
  }
}

async function getUser(userId) {
  try {
    const user = await User.findByPk(userId);

    return user;
  } catch (error) {
    console.error('Error fetching user:', error);
    throw new Error('Failed to retrieve user.');
  }
}

async function createUser(name) {
  try {
    const user = await User.create({ name });

    return user;
  } catch (error) {
    console.error('Error creating user:', error);
    throw new Error('Failed to create user.');
  }
}

async function deleteUser(userId) {
  try {
    const deletedRows = await User.destroy({
      where: {
        id: userId,
      },
    });

    return deletedRows > 0;
  } catch (error) {
    console.error('Error removing user:', error);

    return false;
  }
}

async function updateUser(userId, body) {
  try {
    const { name } = body;

    await User.update(
      { name },
      {
        where: {
          id: userId,
        },
      },
    );

    return true;
  } catch (error) {
    console.error('Error updating user:', error);

    return false;
  }
}

module.exports = {
  getAllUsers,
  getUser,
  createUser,
  deleteUser,
  updateUser,
};
