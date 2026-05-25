const { models } = require('../models/models.js');

const getAll = async () => {
  const categories = await models.Categories.findAll();

  return categories;
};

const get = async (id) => {
  const category = await models.Categories.findByPk(id);

  return category;
};

const create = async (category) => {
  const created = await models.Categories.create({ category });

  return created;
};

const update = async (id, category) => {
  await models.Categories.update(
    { category },
    {
      where: { id },
    },
  );

  const updated = models.Categories.findByPk(id);

  return updated;
};

const remove = async (id) => {
  const deleted = await models.Categories.destroy({
    where: { id },
  });

  return deleted;
};

module.exports = {
  getAll,
  get,
  create,
  update,
  remove,
};
