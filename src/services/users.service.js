const { User } = require('../models/User.model');

const getUsers = async () => {
  const users = await User.findAll();

  return users;
};

const getUser = async (id) => {
  const user = User.findByPk(id);

  return user;
};

const addUser = async (name) => {
  const newUser = await User.create({ name });

  return newUser;
};

const updateUser = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return getUser(id);
};

const deleteUser = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  getUsers,
  getUser,
  addUser,
  updateUser,
  deleteUser,
};
