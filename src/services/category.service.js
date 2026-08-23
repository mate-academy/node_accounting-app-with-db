const { Category } = require('../models/Category.model.js');

const getAll = async () => {
  const categories = await Category.findAll();

  return categories;
};

const getById = async (id) => {
  const category = await Category.findByPk(id);

  return category;
};

const create = async (name) => {
  const created = await Category.create({ name });

  return created;
};

const update = async ({ id, name }) => {
  await Category.update(
    { name },
    {
      where: { id },
    },
  );

  const updatedCategory = await getById(id);

  return updatedCategory;
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
};
