const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll();
};

const getUser = async (id) => {
  return User.findByPk(id);
};

const create = async (name) => {
  return User.create({ name });
};

const update = async (id, name) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  await user.update({ name });

  return user;
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getUser,
  create,
  update,
  remove,
};
