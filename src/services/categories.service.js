const { Category } = require('../models/Category.model');

const getAll = () => {
  return Category.findAll();
};

const getById = (id) => {
  return Category.findByPk(id);
};

const create = (name) => {
  return Category.create({ name });
};

const update = (id, name) => {
  return Category.update({ name }, { where: { id } });
};

const remove = (id) => {
  return Category.destroy({ where: { id } });
};

const normalize = ({ id, name }) => {
  return {
    id,
    name,
  };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
};
