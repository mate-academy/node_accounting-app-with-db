const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');
const { Category } = require('../models/Category.model');

const normalize = (item, category) => {
  const { id, userId, spentAt, title, amount, note } = item.toJSON();

  return {
    id,
    userId,
    spentAt,
    title,
    amount,
    category: category || item.Category?.name,
    note,
  };
};

async function getAll({ userId, categories, from, to }) {
  const where = {};
  const categoryWhere = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories?.length) {
    const normalized = Array.isArray(categories) ? categories : [categories];

    categoryWhere.name = {
      [Op.in]: normalized,
    };
  }

  if (from && to) {
    where.spentAt = {
      [Op.between]: [from, to],
    };
  }

  return Expense.findAll({
    where,
    include: {
      model: Category,
      attributes: ['name'],
      where: Object.keys(categoryWhere).length ? categoryWhere : undefined,
    },
  });
}

async function getById(id) {
  return Expense.findByPk(id, {
    include: {
      model: Category,
      attributes: ['name'],
    },
  });
}

async function create(params) {
  return Expense.create(params);
}

async function deleteById(id) {
  return Expense.destroy({
    where: {
      id,
    },
  });
}

async function update(id, params) {
  return Expense.update(params, {
    where: { id },
  });
}

module.exports = {
  normalize,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
