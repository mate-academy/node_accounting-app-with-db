/* eslint-disable no-return-await */
const { User } = require('../models/User.model.js');

const getUsers = async () => {
  return await User.findAll();
};

const getUser = async (id) => {
  return await User.findByPk(id);
};

const createUser = async (name) => {
  return await User.create({ name });
};

const deleteUser = async (id) => {
  return await User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = await User.findByPk(id);

  return updatedUser;
};

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getUsers,
};
