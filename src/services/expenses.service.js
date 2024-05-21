const { getPreparedExpenses } = require('../utils/getPreparedExpenses');
const { Expense } = require('../models/Expense.model');

const getAll = async (query = null) => {
  const expenses = await Expense.findAll();

  return getPreparedExpenses(query, expenses);
};

const getOneById = async (id) => {
  const result = await Expense.findByPk(id);

  return result;
};

const create = async ({
  userId,
  spentAt,
  title,
  amount,
  category = '-',
  note = '-',
}) => {
  const newExpense = await Expense.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  return newExpense;
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

const update = async (id, { title, spentAt, amount, category, note }) => {
  if (!getOneById(id)) {
    return null;
  }

  await Expense.update(
    {
      title,
      spentAt,
      amount,
      category,
      note,
    },
    { where: { id: id } },
  );

  const updatedExpense = await getOneById(id);

  return updatedExpense;
};

module.exports = {
  getAll,
  getOneById,
  create,
  remove,
  update,
};
