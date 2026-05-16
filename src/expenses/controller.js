/* eslint-disable no-console */
const { expensesService } = require('./service');

const requireExpenseKeys = ['userId', 'title', 'amount', 'category'];

async function getAllExpenses(req, res) {
  try {
    const response = await expensesService.getAll();

    res.status(200).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function getOneExpense(req, res) {
  const expenseId = req.params.id;

  if (!expenseId) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await expensesService.getById(expenseId);

    if (!response) {
      res.status(404).json('Expense not found');
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function addNewExpense(req, res) {
  const expenseBody = req.body;

  if (!requireExpenseKeys.every((key) => key in expenseBody)) {
    res.status(400).json('Invalid data request');

    return;
  }

  try {
    const response = await expensesService.addNew(expenseBody);

    if (!response) {
      throw new Error('Problem with response service');
    }

    res.status(201).json(response);
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function removeExpense(req, res) {
  const expenseId = req.params.id;

  if (!expenseId) {
    res.status(400).json('Invalid data request');
  }

  try {
    const response = await expensesService.delete(expenseId);

    if (!response) {
      res.status(404).json('Expense not found');
    } else {
      res.status(204).send();
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

async function updateExpense(req, res) {
  const expenseId = req.params.id;
  const expenseBody = req.body;

  if (!expenseId || !expenseBody) {
    res.status(400).json('Invalid data reguest');

    return;
  }

  try {
    const response = await expensesService.update(expenseId, expenseBody);

    if (!response) {
      res.status(404).json('Expense not found');
    } else {
      res.status(200).json(response);
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).json('Server error');
  }
}

module.exports = {
  getAllExpenses,
  addNewExpense,
  getOneExpense,
  removeExpense,
  updateExpense,
};
