const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const edit = async (user, { name }) => {
  await user.update({ name }, { silent: true });

  return user;
};

const create = async ({ name }) => {
  const user = await User.create({ name });

  return user;
};

const userService = {
  getAll,
  getById,
  remove,
  edit,
  create,
};

module.exports = userService;
