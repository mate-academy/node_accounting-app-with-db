'use strict';

const { User } = require('../DbInstances/user');

const getAllUsers = async() => {
  const res = await User.findAll();

  return res;
};

const getUserById = async(id) => {
  const user = await User.findByPk(id);

  return user;
};

const createNewUser = async(name) => {
  const newUser = {
    name,
  };

  return User.create(newUser);
};

const deleteUser = async(id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const upgradeUser = async({ id, name }) => {
  await User.update({ name },
    { where: { id } });
};

module.exports = {
  getAllUsers,
  getUserById,
  createNewUser,
  deleteUser,
  upgradeUser,
};
