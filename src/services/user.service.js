'use strict';

const { User } = require('../models/User.model');

const normalize = ({ id, name }) => {
  return { id, name };
};

const getAll = async () => {
  const result = await User.findAll();

  return result.map(normalize);
};

const getById = async (id) => {
  const user = await User.findByPk(id);

  return user ? normalize(user) : null;
};

const create = async (name) => {
  const user = await User.create({ name });

  return normalize(user);
};

const remove = async (id) => {
  const deleted = await User.destroy({
    where: { id },
  });

  return deleted > 0;
};

const update = async (id, updates) => {
  const [updated] = await User.update(
    { name: updates.name },
    { where: { id } },
  );

  if (updated) {
    const updatedUser = await User.findByPk(id);

    return normalize(updatedUser);
  }

  return null;
};

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  remove,
  update,
};
