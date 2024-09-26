const { Op } = require('sequelize');
const { Expense } = require('../models/Expense.model');

const getAll = async (userId, categories, from, to) => {
  const whereParams = {};

  if (userId) {
    whereParams.userId = userId;
  }

  if (categories) {
    whereParams.category = categories;
  }

  if (from || to) {
    whereParams.spentAt = { [Op.between]: [from, to] };
  }

  const expenses = await Expense.findAll({
    where: whereParams,
  });

  return expenses;
};

const getOne = async (id) => {
  const user = await Expense.findByPk(id);

  return user;
};

const create = async (userId, spentAt, title, amount, category, note) => {
  const user = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return user;
};

const update = async (id, { spentAt, title, amount, category, note }) => {
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

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
