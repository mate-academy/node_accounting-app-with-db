/* eslint-disable no-console */
const expenseServices = require('../services/expensesServices.js');
const userServices = require('../services/usersServices.js');

const listAllExpenses = async (req, res) => {
  try {
    const filteredExpenses = await expenseServices.getAllExpenses(req.query);

    res
      .status(200)
      .send(
        filteredExpenses.map((expense) => expenseServices.normalize(expense)),
      );
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const getExpenseById = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(Number(id))) {
    return res.sendStatus(404);
  }

  try {
    const expense = await expenseServices.getExpenseById(Number(id));

    res.status(expense ? 200 : 404).json(expense);
  } catch {
    res.sendStatus(500);
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.body;

  const user = await userServices.getUserById(userId);

  if (!user) {
    return res.sendStatus(400);
  }

  try {
    const newExpense = await expenseServices.createExpense(req.body);

    res.status(201).send(newExpense);
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expenseToRemove = await expenseServices.deleteExpenseById(Number(id));

    if (!expenseToRemove) {
      return res.sendStatus(404);
    }

    res.status(204).send();
  } catch {
    res.status(500).send('Internal Server Error');
  }
};

const updateExpenseById = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.sendStatus(404);
  }

  try {
    const expenseToUpdate = await expenseServices.updateExpenseById({
      ...req.body,
      id: Number(id),
    });

    res.status(expenseToUpdate ? 200 : 404).send(expenseToUpdate);
  } catch {
    res.sendStatus(500);
  }
};

module.exports = {
  listAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpenseById,
};
