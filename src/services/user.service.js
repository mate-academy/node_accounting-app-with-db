'use strict';

const { User } = require('../database');

const getAllUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(id) => {
  try {
    const users = await User.findByPk(id);

    return users;
  } catch (error) {
    return null;
  }
};

const createUser = async(name) => {
  const newUser = await User.create({
    name,
  });

  return newUser;
};

const updateUser = async(id, name) => {
  try {
    const [rowsUpdated, [updatedUser]] = await User.update(
      { name },
      {
        where: { id }, returning: true,
      }
    );

    if (rowsUpdated === 0) {
      throw new Error('User not found or no changes were made.');
    }

    return updatedUser;
  } catch (error) {
    throw error;
  }
};

const deleteUser = async(id) => {
  await User.destroy({
    where: { id },
  });
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
