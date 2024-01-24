'use strict';

const { User } = require('../db');

const getAllUsers = async() => {
  const users = await User.findAll();

  return users;
};

const getUserById = async(id) => {
  try {
    const user = await User.findByPk(id);

    return user;
  } catch (err) {
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
  await User.update(
    { name },
    {
      where: { id },
    }
  );
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
