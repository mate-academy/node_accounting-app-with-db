const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const update = async ({ id, name }) => {
  await User.update({ name }, { where: { id } });

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

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
