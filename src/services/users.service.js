const { User } = require('../models/User.model');

const getAll = async () => {
  const users = await User.findAll();

  return users;
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = (firstName) => {
  return User.create({ firstName });
};

const update = async ({ id, firstName }) => {
  await User.update({ firstName }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  return User.destroy({
    where: {
      id: id,
    },
  });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
