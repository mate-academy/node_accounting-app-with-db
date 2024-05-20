const expensesService = require('../services/expenses.services');

const getAll = async (req, res) => {
  const query = req.query;
  const expenses = await expensesService.get(query);

  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.statusCode = 200;
  res.send(expense);
};

const add = async (req, res) => {
  const body = req.body;
  const userId = parseInt(body.userId);

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.add(body);

  res.statusCode = 201;
  res.send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await expensesService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.update(expense.id, body);

  res.statusCode = 200;
  res.send(updatedExpense);
};

module.exports = {
  getAll,
  add,
  getOne,
  remove,
  update,
};
