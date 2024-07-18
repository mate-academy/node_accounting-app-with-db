const { Op } = require('sequelize');
const { User } = require('../models/User.model');

const getAllUsers = async () => {
  const users = await User.findAll();

  return users;
};

const addUser = async ({ name }) => {
  return User.create({ name });
};

const findUser = async (id) => {
  return User.findByPk(id);
};

const filteredUsers = (id) => {
  const users = User.findAll();

  return users.filter((item) => +item.id !== +id);
};

const changeUser = async ({ id, name }) => {
  const [affectedCount, affectedRows] = await User.update(
    { name },
    { where: { id }, returning: true },
  );

  if (affectedCount > 0) {
    const updatedUser = affectedRows[0];

    return updatedUser;
  }
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
