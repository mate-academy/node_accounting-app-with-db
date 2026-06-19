const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const get = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.send(expenses);
};

const create = async (req, res) => {
  const data = req.body;

  const user = await userService.getUser(data.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.addExpense(data);

  res.status(201).send(newExpense);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = await expensesService.updateExpense(id, data);

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getExpense(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

module.exports = {
  get,
  create,
  getOne,
  update,
  remove,
};
