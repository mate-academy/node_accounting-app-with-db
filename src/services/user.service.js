const { User } = require('../models/User.model');

const getUsers = () => User.findAll();

const getUserById = (id) => User.findByPk(id);

const createUser = (userName) =>
  User.create({
    name: userName,
  });

const deleteUser = (id) =>
  User.destroy({
    where: {
      id,
    },
  });

const patchUser = async (id, name) => {
  await User.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  return User.findByPk(id);
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  patchUser,
};
