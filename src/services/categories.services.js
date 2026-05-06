const {
  models: { Category },
} = require('../models/models');

const get = async () => Category.findAll();

const getOne = async (id) => Category.findByPk(id);

const add = async (title) => {
  const newCategory = await Category.create({ title });

  return newCategory;
};

const remove = async (id) => {
  await Category.destroy({ where: { id } });
};

const update = async ({ id, title }) => {
  await Category.update({ title }, { where: { id } });
};

module.exports = {
  get,
  getOne,
  add,
  remove,
  update,
};
