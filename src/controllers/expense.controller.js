const expenseService = require('../services/expense.service');
const statuses = require('../utils/responseUtils.js');

const getAllExpenses = (req, res) => {
  const expenses = expenseService.getAllExpenses(req.query);

  res.send(expenses);
};

const createExpense = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!userId) {
    res
      .status(statuses.BAD_REQUEST.code)
      .send(`Bad Request: user with id ${userId} does not exist`);

    return;
  }

  if (!userId || !spentAt || !title || !amount) {
    res
      .status(statuses.BAD_REQUEST.code)
      .send('Bad Request: Missing required fields');

    return;
  }

  const newExpense = expenseService.createExpense({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.status(statuses.CREATED.code).send(newExpense);
};

const getExpenseById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: id is required');

    return;
  }

  const expense = expenseService.getExpenseById(+id);

  if (!expense) {
    res
      .status(statuses.NOT_FOUND.code)
      .send(`Not Found: expense with id ${id} does not exist`);

    return;
  }

  res.send(expense);
};

const deleteExpense = (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(statuses.BAD_REQUEST.code).send('Bad Request: id is required');

    return;
  }

  if (!expenseService.getExpenseById(+id)) {
    res
      .status(statuses.NOT_FOUND.code)
      .send(`Not Found: expense with id ${id} does not exist`);

    return;
  }

  expenseService.deleteExpense(+id);
  res.sendStatus(statuses.NO_CONTENT.code);
};

const updateExpense = (req, res) => {
  const { id } = req.params;
  const data = req.body;

  if (!expenseService.getExpenseById(id)) {
    res.sendStatus(statuses.NOT_FOUND.code);

    return;
  }

  const updatedExpense = expenseService.updateExpense(id, data);

  res.send(updatedExpense);
};

module.exports = {
  getAllExpenses,
  createExpense,
  getExpenseById,
  deleteExpense,
  updateExpense,
};
