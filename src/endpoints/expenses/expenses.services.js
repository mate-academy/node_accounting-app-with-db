const { Expense } = require('../../models/Expense.model');

const categories = [
  'Food',
  'Transportation',
  'Entertainment',
  'Shopping',
  'Education',
  'Health',
];

const getAll = async () => {
  const expenses = await Expense.findAll({ order: ['id'] });

  return expenses;
};

const getOne = async (id) => {
  const expense = await Expense.findByPk(id);

  return expense;
};

const create = async (body) => {
  const expenses = await getAll();
  const newExpense = {
    id: expenses.length,
    ...body,
  };

  await Expense.create(newExpense);

  return newExpense;
};

const update = async (body, id) => {
  await Expense.update({ ...body }, { where: { id } });
};

const remove = async (id) => {
  await Expense.destroy({ where: { id } });
};

module.exports = {
  categories,
  getAll,
  getOne,
  create,
  update,
  remove,
};
