const { Op } = require('sequelize');
const {
  models: { Category },
} = require('../models/models');

const getByName = async (input) => {
  let category = [];

  if (Array.isArray(input)) {
    if (input.length === 0) {
      return [];
    }

    category = await Category.findAll({
      where: {
        name: { [Op.in]: input },
      },
    });

    return category;
  }

  if (typeof input === 'string') {
    category = await Category.findOne({
      where: { name: input },
    });

    return category;
  }

  return category;
};

const getAll = async () => {
  const caregory = await Category.findAll();

  return caregory;
};

const getById = async (id) => {
  const catById = await Category.findByPk(id);

  return catById;
};

const create = async (name) => {
  const existing = await Category.findOne({ where: { name } });

  if (existing) {
    return existing;
  }

  const newCategory = await Category.create({ name });

  return newCategory;
};

const update = async (data, id) => {
  const [updated] = await Category.update(
    { name: data },
    {
      where: {
        id: id,
      },
    },
  );

  if (updated !== 0) {
    const catById = await Category.findByPk(id);

    return catById;
  }

  return null;
};

const remove = async (id) => {
  const deletedCount = await Category.destroy({
    where: {
      id: id,
    },
  });

  return deletedCount;
};

module.exports = {
  getByName,
  getAll,
  getById,
  create,
  update,
  remove,
};
