const { Op } = require('sequelize');
const {
  models: { Category },
} = require('../models/models');

const getByName = async (input) => {
  let caregory = [];

  if (Array.isArray(input)) {
    if (input.length === 0) {
      return [];
    }

    caregory = await Category.findAll({
      where: {
        name: { [Op.in]: input },
      },
    });

    return caregory;
  }

  if (typeof input === 'string') {
    caregory = await Category.findOne({
      where: { name: input },
    });

    return caregory;
  }

  return caregory;
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

  return updated;
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
