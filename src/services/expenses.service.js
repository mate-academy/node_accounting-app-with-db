const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async ({ userId, from, to, categories }) => {
  const whereConditions = {};

  if (userId) {
    whereConditions.userId = userId;
  }

  if (categories) {
    const categoryList = categories.split(',').map((item) => item.trim());

    whereConditions.category = {
      [Op.in]: categoryList,
    };
  }

  if (from || to) {
    whereConditions.spentAt = {};

    if (from) {
      whereConditions.spentAt[Op.gte] = new Date(from);
    }

    if (to) {
      whereConditions.spentAt[Op.lte] = new Date(to);
    }
  }

  const result = await Expense.findAll({ where: whereConditions });

  return result;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const deleteOne = async (id) => {
  return Expense.destroy({ where: { id } });
};

const update = async ({ id, spentAt, title, amount, category, note }) => {
  await Expense.update(
    {
      spentAt,
      title,
      amount,
      category,
      note,
    },
    { where: { id } },
  );

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteOne,
  update,
};
