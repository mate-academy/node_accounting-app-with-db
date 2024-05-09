const userService = require('../services/user.service');
const expenseService = require('../services/expense.service');

const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;

  if (!(await userService.getById(userId))) {
    return res.sendStatus(400);
  }

  if (!spentAt || !title || !amount) {
    return res.sendStatus(400);
  }

  res.statusCode = 201;

  const createdExpense = await expenseService.create(req.body);

  res.send(expenseService.normilize(createdExpense));
};

const getAll = async (req, res) => {
  const expenses = await expenseService.getAll(req.query);

  res.send(expenses.map((expense) => expenseService.normilize(expense)));
};

const get = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expenseService.normilize(expense));
};

const update = async (req, res) => {
  const { id } = req.params;
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }
  await expenseService.update(id, req.body);

  const updatedExpense = await expenseService.getById(id);

  res.send(expenseService.normilize(updatedExpense));
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getById(id))) {
    return res.sendStatus(404);
  }

  await expenseService.remove(id);
  res.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  get,
  update,
  remove,
};
