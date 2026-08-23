const { Expense } = require('../models/Expense.model.js');
const userService = require('../services/user.service.js');
const { Sequelize } = require('../db');

const getAll = async ({ userId, categories, from, to }) => {
  // const result = await Expense.findAll();
  // return result;

  const where = {};

  if (userId) {
    where.userId = Number(userId);
  }

  if (categories) {
    const { Op } = require('sequelize');
    const cats = Array.isArray(categories) ? categories : [categories];

    where.category = { [Op.in]: cats };
  }

  if (from) {
    const { Op } = require('sequelize');

    where.spentAt = { ...where.spentAt, [Op.gte]: new Date(from) };
  }

  if (to) {
    const { Op } = require('sequelize');

    where.spentAt = { ...where.spentAt, [Op.lte]: new Date(to) };
  }

  return Expense.findAll({ where });
};

const getById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async ({ userId, spentAt, title, amount, category, note }) => {
  const user = await userService.getById(userId);

  if (!user) {
    return null;
  }

  try {
    return await Expense.create({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });
  } catch (error) {
    if (error instanceof Sequelize.UniqueConstraintError) {
      throw Object.assign(new Error('Expense already exists'), { status: 400 });
    }

    throw Object.assign(new Error('Failed to create expense'), { status: 500 });
  }
};

const update = async ({
  id,
  userId,
  spentAt,
  title,
  amount,
  category,
  note,
}) => {
  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    },
    {
      where: { id },
    },
  );

  const updated = await Expense.findByPk(id);

  return updated;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
