const { Category } = require('../models/Category.model');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  return Category.findByPk(id);
};

const create = (name) => {
  return Category.create({ name });
};

const update = async ({ id, name }) => {
  await Category.update({ name }, { where: { id } });

  return getById(id);
};

const remove = async (id) => {
  return Category.destroy({
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
