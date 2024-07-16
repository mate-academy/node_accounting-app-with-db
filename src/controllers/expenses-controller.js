const {
  getAllExpenses,
  getExpensesByFilter,
  createExpense,
  getExpenseById,
  deleteExpenseById,
  updateExpense,
} = require('../services/ExpenseService.js');
const { getUserById } = require('../services/userService.js');

const getExpenses = (req, res) => {
  const { userId, categories, from, to } = req.query;

  if (!userId && !categories && !from && !to) {
    res.send(getAllExpenses());

    return;
  }

  let expensesToSend = [];

  if (userId) {
    expensesToSend = expensesToSend.concat(
      getExpensesByFilter((expense) => expense.userId === +userId),
    );
  }

  if (categories) {
    if (userId) {
      expensesToSend = expensesToSend.filter(
        (expense) => expense.category === categories,
      );
    } else {
      expensesToSend = getExpensesByFilter(
        (expense) => expense.category === categories,
      );
    }
  }

  if (from && to) {
    if (userId || categories) {
      expensesToSend = expensesToSend.filter(
        (expense) =>
          new Date(expense.spentAt) > new Date(from) &&
          new Date(expense.spentAt) < new Date(to),
      );
    } else {
      expensesToSend = getExpensesByFilter(
        (expense) =>
          new Date(expense.spentAt) > new Date(from) &&
          new Date(expense.spentAt) < new Date(to),
      );
    }
  }

  res.statusCode = 200;
  res.send(expensesToSend);
};

const getExpense = (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(400);

    return;
  }

  const searchedExpense = getExpenseById(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(searchedExpense);
};

const postExpense = (req, res) => {
  const { userId } = req.body;

  if (typeof userId !== 'number') {
    res.sendStatus(400);

    return;
  }

  if (!getUserById(userId)) {
    res.sendStatus(400);

    return;
  }

  const newExpense = createExpense(req.body);

  res.statusCode = 201;
  res.send(newExpense);
};

const deleteExpense = (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(404);

    return;
  }

  const searchedExpense = getExpenseById(+expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  deleteExpenseById(expenseId);

  res.sendStatus(204);
};

const patchExpense = (req, res) => {
  const { expenseId } = req.params;

  if (expenseId === undefined) {
    res.sendStatus(400);

    return;
  }

  const searchedExpense = getExpenseById(expenseId);

  if (!searchedExpense) {
    res.sendStatus(404);

    return;
  }

  const newExpenseData = req.body;

  updateExpense(searchedExpense, newExpenseData);

  Object.assign(searchedExpense, newExpenseData);

  res.statusCode = 200;
  res.send(searchedExpense);
};

module.exports = {
  getExpenses,
  getExpense,
  postExpense,
  deleteExpense,
  patchExpense,
};
