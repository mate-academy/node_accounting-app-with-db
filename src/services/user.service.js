/* eslint-disable no-return-await */

const { User } = require('../models/User.model');

const getAll = async () => {
  const result = await User.findAll();

  return result;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const createUser = async (name) => {
  return User.create({ name });
};

const remove = async (id) => {
  await User.destroy({
    where: {
      id,
    },
  });
};

const update = async ({ id, name }) => {
  const [affectedCount] = await User.update({ name }, { where: { id } });

  if (affectedCount === 0) {
    throw new Error('User  not found or no changes made');
  }

  return User.findByPk(id);
};

module.exports = {
  getAll,
  getById,
  createUser,
  update,
  remove,
};
