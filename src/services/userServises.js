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

const postNewUser = async(name) => {
  const user = await User.create({
    name,
  });

  return user;
};

const deleteUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async(id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  const user = await getUserById(id);

  return user;
};

module.exports = {
  updateUser,
  deleteUser,
  getUserById,
  getAllUsers,
  postNewUser,
};
