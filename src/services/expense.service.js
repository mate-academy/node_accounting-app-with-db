const { getFilteredExpenses } = require('../getFilteredExpenses');
const { Expense } = require('../models/Expense.model');

const getAll = async (query) => {
  const filters = getFilteredExpenses(query);

  return Expense.findAll({ where: filters });
};

const getById = async (userID) => {
  // return expenses.find((expense) => expense.id === Number(userID)) || null;
  return Expense.findByPk(userID);
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
  // const expenseIndex = expenses.findIndex(
  //   (expense) => expense.id === Number(id),
  // );
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
  // expenses[expenseIndex] = { ...expenses[expenseIndex], ...data };

  // return expenses[expenseIndex];
};

module.exports = {
  getAll,
  getById,
  create,
  remove,
  update,
};
