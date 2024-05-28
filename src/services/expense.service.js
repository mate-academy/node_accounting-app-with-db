const { getFilteredExpenses } = require('../getFilteredExpenses');
const { Expense } = require('../models/Expense.model');

const getAll = async (query) => {
  const filters = getFilteredExpenses(query);

  return Expense.findAll({ where: filters });
};

const getById = async (id) => {
  return Expense.findByPk(id);
};

const create = async ({
  userId,
  spentAt,
  title,
  amount,
  category = '',
  note = '',
}) => {
  return Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });
};

const remove = async (id) => {
  await Expense.destroy({
    where: {
      id,
    },
  });
};

const update = async (id, data) => {
  const { userId, spentAt, title, amount, category } = data;

  await Expense.update(
    {
      userId,
      spentAt,
      title,
      amount,
      category,
    },
    { where: { id } },
  );
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
