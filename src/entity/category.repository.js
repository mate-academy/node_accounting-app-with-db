const { models } = require('../models/models');

async function emptyCategories() {
  await models.Category.destroy({
    truncate: true,
  });
}

async function getAll() {
  return models.Category.findAll();
}

async function getById(id) {
  const foundCategories = await models.Category.findAll({
    where: {
      id,
    },
  });

  return foundCategories[0];
}

async function create(category) {
  return models.Category.create({ category });
}

async function deleteById(id) {
  await models.Category.destroy({
    where: {
      id,
    },
  });
}

async function update({ id, category }) {
  await models.Category.update(
    {
      category,
    },
    {
      where: {
        id,
      },
    },
  );

  const updatedCategory = await getById(id);

  return updatedCategory;
}

const categoryRepository = {
  emptyCategories,
  getAll,
  getById,
  create,
  deleteById,
  update,
};

module.exports = categoryRepository;
