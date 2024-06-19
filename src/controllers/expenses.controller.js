const expensesService = require('../services/expenses.service');

const getExpenses = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expensesService.getExpenses(
      +userId,
      categories,
      from,
      to,
    );

    res.send(expenses);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const getOneExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expensesService.getExpense(+id);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const addExpense = async (req, res) => {
  const expenseData = req.body;

  try {
    const expense = await expensesService.addExpense(expenseData);

    res.status(201).send(expense);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const updateExpense = async (req, res) => {
  const expenseData = req.body;
  const { id } = req.params;

  try {
    const expense = await expensesService.updateExpense(+id, expenseData);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const didSucceed = await expensesService.deleteExpense(+id);

    if (didSucceed) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (error) {
    res.status(400).send(error.message);
  }
};

module.exports = {
  getExpenses,
  getOneExpense,
  addExpense,
  deleteExpense,
  updateExpense,
};
