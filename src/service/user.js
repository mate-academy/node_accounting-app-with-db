const { User } = require('../models/User.model');

const getAll = async () => {
  return User.findAll({
    order: ['name'],
  });
};

const getById = async (id) => {
  return User.findByPk(id);
};

const create = async (user) => {
  // await sequelize.sync();

  return User.create(user);
};

const remove = async (id) => {
  return User.destroy({ where: { id } });
};

const update = async (id, name) => {
  return User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  create,
  getById,
  remove,
  update,
};
