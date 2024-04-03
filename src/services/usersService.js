const { User } = require('../models/User.model');

const init = async () => {
  User.sync({ force: true });
};

const normalize = ({ id, name }) => {
  return { id, name };
};

const getAll = async () => {
  const users = await User.findAll();

  return users.map((el) => normalize(el));
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  if (!user) {
    return null;
  }

  return normalize(user);
};

const create = async (name) => {
  const user = await User.create({ name });

  return normalize(user);
};

const update = async (id, name) => {
  const user = await getById(id);

  if (!user) {
    return null;
  }

  return User.update({ name }, { where: { id } });
};

const remove = async (id) => {
  await User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  init,
};
