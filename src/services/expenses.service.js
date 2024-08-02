const { Expense } = require('../models/Expense.model');

const normalize = ({ id, userId, spentAt, title, amount, category, note }) => {
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

const getAll = async ({ userId, from, to, categories }) => {
  const result = await Expense.findAll();

  const filteredExpenses = result.filter((expense) => {
    if (userId && expense.userId !== +userId) {
      return false;
    }

    if (from && new Date(expense.spentAt) < new Date(from)) {
      return false;
    }

    if (to && new Date(expense.spentAt) > new Date(to)) {
      return false;
    }

    if (categories && !categories.includes(expense.category)) {
      return false;
    }

    return true;
  });

  return filteredExpenses;
};

const getById = async (id) => {
  const numId = +id;

  if (isNaN(numId)) {
    return;
  }

  return Expense.findByPk(numId);
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

const deleteById = async (id) => {
  await Expense.destroy({
    where: { id },
  });
};

const updateById = async (id, { spentAt, title, amount, category, note }) => {
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
  getById,
  create,
  deleteById,
  updateById,
  normalize,
};
