const { sequelize } = require('../db');
const { models } = require('../models/models');

const getAll = async () => {
  // eslint-disable-next-line no-return-await
  return await models.Category.findAll();
};

const getCategoryById = async (id) => {
  const result = (await models.Category.findByPk(id)) || null;

  return result;
};

const create = async (name) => {
  // eslint-disable-next-line no-return-await
  return await models.Category.create({ name });
};

const update = async (id, name) => {
  await models.Category.update(
    { name },
    {
      where: {
        id,
      },
    },
  );

  // eslint-disable-next-line no-return-await
  return await getCategoryById(id);
};

const remove = async (id) => {
  await sequelize.query(`DELETE FROM categories WHERE id = ?`, {
    replacements: [id],
    type: sequelize.QueryTypes.DELETE,
  });
};

module.exports = {
  getAll,
  getCategoryById,
  create,
  update,
  remove,
};
