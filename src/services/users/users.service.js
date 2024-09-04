const { User } = require('../../models/User.model');

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

const deleteById = async (id) => {
  const destroyed = await User.destroy({ where: { id } });

  return destroyed;
};

const update = async (id, name) => {
  await User.update({ name }, { where: { id } });

  return getById(id);
};

module.exports = {
  usersService: {
    getAll,
    getById,
    create,
    deleteById,
    update,
  },
};
