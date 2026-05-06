const { Op } = require('sequelize');
const { models } = require('../models/models');
const Expenses = models.Expense;

const get = async ({ userId, categories, from, to }) => {
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    where.category = { [Op.in]: categories };
  }

  if (from || to) {
    where.spentAt = {};

    if (from) {
      where.spentAt[Op.gte] = from;
    }

    if (to) {
      where.spentAt[Op.lte] = to;
    }
  }

  return Expenses.findAll({ where: where });
};

const getOne = async (id) => Expenses.findByPk(id);

const add = async (data) => {
  const newExpense = await Expenses.create(data);

  return newExpense;
};

const remove = async (id) => {
  await Expenses.destroy({ where: { id } });
};

const update = async ({ id, ...data }) => {
  await Expenses.update({ ...data }, { where: { id } });
};

module.exports = {
  get,
  getOne,
  add,
  remove,
  update,
};
