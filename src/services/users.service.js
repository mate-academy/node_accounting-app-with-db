const { User } = require('../models/User.model.js');

const getAll = () => {
  return User.findAll();
};

const getById = (id) => {
  return User.findByPk(id);
};

const create = (name) => {
  return User.create({ name });
};

const remove = (id) => {
  return User.destroy({
    where: { id },
  });
};

const update = ({ id, name }) => {
  return User.update({ name }, { where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
