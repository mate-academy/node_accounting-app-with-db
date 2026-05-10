const expensesService = require('../services/expenses.service.js');

const { getUserById } = require('../services/users.service.js');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const result = await expensesService.getAllExpenses({
    userId,
    from,
    to,
    categories,
  });
  res.send(result);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  const foundExpense = await expensesService.getExpenseById(id);

  if (!foundExpense) {
    res.sendStatus(404);

    return;
  }

  res.send(foundExpense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount } = req.body;

  if (userId === undefined || !spentAt || !title || amount === undefined) {
    return res.sendStatus(400);
  }

  const userExists = await getUserById(userId);

  if (!userExists) {
    return res.sendStatus(400);
  }

  const createdExpense = await expensesService.createExpense(req.body);
  res.statusCode = 201;
  res.send(createdExpense);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);

  if (!(await expensesService.getExpenseById(id))) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expensesService.getExpenseById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const updatedExpense = await expensesService.updateExpense(id, req.body);
  res.send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
