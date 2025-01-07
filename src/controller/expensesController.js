const expensesService = require('../services/expensesService.js');
const usersService = require('../services/usersService.js');

const get = async (req, res) => {
  const expenses = await expensesService.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const data = req.body;
  const user = await usersService.getUserById(data.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.createExpense(data);

  res.status(201).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await expensesService.removeExpense(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExp = await expensesService.updateExpense(id, {
    spentAt,
    title,
    amount,
    category,
    note,
  });

  if (!updatedExp) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExp);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
