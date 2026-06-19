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

const getOne = async (id) => {
  const user = await Expense.findByPk(id);

  return user;
};

const remove = async (id) => {
  return Expense.destroy({
    where: { id },
  });
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
    {
      where: { id },
    },
  );

  return Expense.findByPk(id);
};

module.exports = {
  getAll,
  create,
  getOne,
  remove,
  update,
};
