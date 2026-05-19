const { models } = require('../models/models.js');
const User = models.User;

const getAll = async () => {
  return User.findAll();
};

const create = async (data) => {
  const { name } = data;

  return User.create({ name });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const deleteById = async (id) => {
  return User.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, data) => {
  await User.update(data, {
    where: {
      id,
    },
  });

  return User.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
