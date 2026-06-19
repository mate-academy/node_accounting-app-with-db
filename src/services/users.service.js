const { User } = require('../models/User.model');

const getAllUsersService = async () => {
  const users = await User.findAll();

  return users;
};

const createUserService = async ({ name }) => {
  const result = await User.create({ name });

  return result;
};

const findUserByIdService = async (id) => {
  return User.findByPk(id);
};

const deleteUserService = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const updateUserService = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return User.findByPk(id);
};

module.exports = {
  getAllUsersService,
  createUserService,
  findUserByIdService,
  deleteUserService,
  updateUserService,
};
