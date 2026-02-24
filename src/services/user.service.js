const { models } = require('../models/models.js');
const { normalizeUser } = require('../dto');

const getAllUsers = async () => {
  const users = await models.User.findAll();

  return users.map(normalizeUser);
};

const getUserById = async (id) => {
  const user = await models.User.findByPk(id);

  if (!user) {
    return null;
  }

  return normalizeUser(user.get({ plain: true }));
};

const createUser = async ({ name }) => {
  const user = await models.User.create({ name });

  if (user) {
    return getUserById(user.id);
  }

  return null;
};

const removeUser = async (id) => {
  await models.User.destroy({ where: { id } });
};

const updateUser = async (id, { name }) => {
  await models.User.update({ name }, { where: { id } });

  return getUserById(id);
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  removeUser,
  updateUser,
};
