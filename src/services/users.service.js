const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

const getAll = () => {
  return User.findAll({ order: [['id', 'ASC']] });
};

const getById = (id) => {
  return User.findByPk(id);
};

const createUser = (name) => {
  return User.create({ name });
};

const update = async ({ id, ...updates }) => {
  const definedUpdates = Object.fromEntries(
    Object.entries(updates).filter(([, value]) => value !== undefined),
  );

  await User.update(definedUpdates, {
    where: { id },
  });

  return getById(id);
};

const remove = (id) => {
  return User.destroy({
    where: { id },
  });
};

module.exports = {
  getAll,
  getById,
  createUser,
  update,
  remove,
  normalize,
};
