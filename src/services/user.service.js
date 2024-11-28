const { User } = require('../models/User.model');

const getUsers = () => {
  return User.findAll();
};

const getUserById = (id) => {
  return User.findByPk(id);
};

const createUser = (userName) => {
  return User.create({ name: userName });
};

const deleteUser = (id) => {
  User.destroy({
    where: {
      id,
    },
  });
};

const updateUser = (id, name) => {
  return User.update(
    { name },
    {
      where: {
        id,
      },
      returning: true,
    },
  );
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
