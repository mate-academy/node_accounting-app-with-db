const expensesService = require('../services/expences.service');
const usersService = require('../services/user.service');

const get = async (req, res) => {
  const expenses = await expensesService.getExpenses(req.query);

  res.send(expenses);
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

const create = async (req, res) => {
  const data = req.body;

  const user = await usersService.getUser(data.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const newExpense = await expensesService.addExpense(data);

  res.status(201).send(newExpense);
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
  getOne,
  create,
  update,
  remove,
};
