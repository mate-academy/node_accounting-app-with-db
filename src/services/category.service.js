const { models } = require('../models/models');
const { ent } = require('../static/vocab');
const { get } = require('./general.service');
const { NotFoundError } = require('../errors');

const getCategory = async (id = null) => {
  return get(ent.cat, id);
};

const postCategory = async (body) => {
  const newCategory = await models.Category.create({ ...body });

  return newCategory;
};

const patchCategory = async (id, body) => {
  const category = await get(ent.cat, id);

  if (category === null) {
    throw new NotFoundError(ent.cat, id);
  }

  await category.update({ ...body });

  return category;
};

const deleteCategory = async (id) => {
  const category = await get(ent.cat, id);

  if (category === null) {
    throw new NotFoundError(ent.cat, id);
  }

  await category.destroy();

  return true;
};

module.exports = {
  getCategory,
  postCategory,
  patchCategory,
  deleteCategory,
};
