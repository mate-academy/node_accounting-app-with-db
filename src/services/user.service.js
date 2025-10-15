const { User } = require('../models/User.model');

User.sync({ force: true });

const getUsers = async () => {
  const result = await User.findAll();

  return result;
};

const getUser = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  const user = await User.create({
    name,
  });

  return user;
};

const deleteUser = async (id) => {
  const user = await getUser(id);

  if (!user) {
    return null;
  }

  await User.destroy({ where: { id } });

  return user;
};

const updateUser = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

  const updatedUser = await getUser(id);

  return updatedUser;
};

module.exports = {
  updateUser,
  deleteUser,
  createUser,
  getUser,
  getUsers,
};
