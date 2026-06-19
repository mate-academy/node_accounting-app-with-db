const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const create = async (name) => {
  const user = await User.create({ name });

  return user;
};

const getOne = async (id) => {
  const user = await User.findByPk(id);

  return user;
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

const update = async (id, name) => {
  await User.update(
    {
      name,
    },
    {
      where: { id },
    },
  );

  return User.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
