'use strict';

const { User } = require('../models/User.model');

const getUsers = () => {
  return User.findAll();
};

const getUserById = async(id) => {
  return User.findByPk(id);
};

const createUser = (user) => {
  return User.create({ ...user });
};

const updateUserById = async(id, user) => {
  const [numOfRowsUpdated, [updatedExpense]] = await User.update(
    { ...user },
    {
      returning: true,
      where: { id },
    }
  );

  return numOfRowsUpdated > 0 ? updatedExpense : null;
};

const deleteUserById = (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUserById,
  updateUserById,
};
