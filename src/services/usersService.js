const { sequelize } = require('../db');
const { User } = require('../models/User.model');

const init = async () => {
  User.sync({ force: true });
};

const normalize = (body) => {
  if (body) {
    const { id, name } = body;

    return { id, name };
  }

  return null;
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
  try {
    const result = await sequelize.transaction(async (t) => {
      const user = await getById(id);

      if (!user) {
        return null;
      }

      await User.update({ name }, { where: { id } });

      return getById(id);
    });

    return normalize(result);
  } catch {
    return 'error';
  }
};

const remove = (id) => {
  return User.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  init,
};
