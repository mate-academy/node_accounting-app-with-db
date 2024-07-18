const { Op } = require('sequelize');
const { User } = require('../models/User.model');

const getAllUsers = () => {
  const users = User.findAll();

  return users;
};

const addUser = async ({ id, name }) => {
  await User.create({ id, name });
};

const findUser = async (id) => {
  return User.findByPk(id);
};

const filteredUsers = (id) => {
  const users = User.findAll();

  return users.filter((item) => +item.id !== +id);
};

const changeUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });
};

const deleteUser = async (id) => {
  await User.destroy({
    where: { id },
  });
};

const deleteUsers = async () => {
  const users = User.findAll();
  const ids = (await users).map((item) => item.id);

  await User.destroy({
    where: {
      id: {
        [Op.in]: ids,
      },
    },
  });
};

module.exports = {
  getAllUsers,
  addUser,
  findUser,
  filteredUsers,
  changeUser,
  deleteUser,
  deleteUsers,
};
