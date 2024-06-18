const expenseService = require('../services/expense.service');

async function getAll(req, res) {
  const { userId, categories, from, to } = req.query;

  try {
    const expenses = await expenseService.getExpenses(
      +userId,
      categories,
      from,
      to,
    );

    res.send(expenses);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function getOne(req, res) {
  const { id } = req.params;

  try {
    const expense = await expenseService.getExpense(+id);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function createOne(req, res) {
  const expenseData = req.body;

  try {
    const expense = await expenseService.createExpense(expenseData);

    res.status(201).send(expense);
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function updateOne(req, res) {
  const { id } = req.params;
  const expenseData = req.body;

  try {
    const expense = await expenseService.updateExpense(+id, expenseData);

    if (expense) {
      res.send(expense);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).send(e.message);
  }
}

async function deleteOne(req, res) {
  const { id } = req.params;

  try {
    const success = await expenseService.deleteExpense(+id);

    if (success) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  } catch (e) {
    res.status(400).message(e.message);
  }
}

module.exports = {
  getAll,
  getOne,
  createOne,
  deleteOne,
  updateOne,
};
