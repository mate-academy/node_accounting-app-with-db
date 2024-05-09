const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const normilize = ({ id, userId, spentAt, title, amount, category, note }) => {
  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };
};

const create = (data) => {
  return Expense.create({
    ...data,
    note: data?.note ?? '',
  });
};

const getAll = ({ userId, categories, from, to }) => {
  const filterParams = {};

  if (userId) {
    filterParams.userId = userId;
  }

  if (categories) {
    filterParams.category = categories;
  }

  if (from || to) {
    filterParams.spentAt = {
      ...(from ? { [Op.gte]: from } : {}),
      ...(to ? { [Op.lte]: to } : {}),
    };
  }

  return Expense.findAll({
    where: filterParams,
  });
};

const getById = (id) => {
  return Expense.findByPk(id);
};

const update = (id, data) => {
  return Expense.update(
    {
      ...data,
    },
    {
      where: {
        id,
      },
    },
  );
};

const remove = (id) => {
  Expense.destroy({
    where: {
      id,
    },
  });
};

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
  normilize,
};
