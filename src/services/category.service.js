const { Category } = require('../models/Category.model');

const normalize = ({ id, name }) => ({
  id,
  name,
});

const getAll = async () => {
  return Category.findAll();
};

const getById = async ({ id }) => {
  return Category.findByPk(id);
};

const getByName = async (name) => {
  return Category.findOne({ where: { name } });
};

const create = async ({ name }) => {
  return Category.create({ name });
};

const update = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  await Category.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
  getByName,
};
