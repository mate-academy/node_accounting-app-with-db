const {
  models: { User },
} = require('../models/models');

require('sequelize');

const getUsers = () => {
  return User.findAll();
};

const getUser = (id) => {
  return User.findByPk(id);
};

const deleteUser = async (id) => {
  const rows = await User.destroy({
    where: {
      id: id,
    },
  });

  return rows === 1;
};

const addUser = async ({ name }) => {
  return User.create({ name });
};

const updateUser = async (id, userInfo) => {
  const [, [user]] = await User.update(userInfo, {
    where: {
      id,
    },
    returning: true,
  });

  return user;
};

module.exports = {
  getUsers,
  getUser,
  deleteUser,
  addUser,
  updateUser,
};
