const { Expense } = require('../models/Expense.model');

const getAll = async () => {
  return Expense.findAll();
};

const get = async (id) => {
  return Expense.findByPk(id);
};

const remove = async (id) => {
  return Expense.destroy({ where: { id } });
};

const create = async (expense) => {
  return Expense.create(expense);
};

const update = async (expense) => {
  const { id } = expense;

  return Expense.update({ ...expense }, { where: { id } });
};

async function filterExpenses(params) {
  const { userId, categories } = params;
  let expenses = await Expense.findAll();

  if (userId) {
    expenses = expenses.filter((expense) => expense.userId === +userId);
  }

  if (categories) {
    expenses = expenses.filter(
      (expense) =>
        // eslint-disable-next-line comma-dangle
        categories.includes(expense.category),
      // eslint-disable-next-line function-paren-newline
    );
  }

  // if (from) {
  //   expenses = expenses.filter((expense) => expense.spentAt > from);
  // }

  // if (to) {
  //   expenses = expenses.filter((expense) => expense.spentAt < to);
  // }

  return expenses;
}

const expenseService = {
  getAll,
  get,
  remove,
  create,
  update,
  filterExpenses,
};

module.exports = {
  expenseService,
};
