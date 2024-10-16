const expensesService = require('../services/expensesService');
const userService = require('../services/userService');

const get = (req, res) => {
  const { userId, categories, from, to } = req.query;
  const filteredExpenses = expensesService.getAllExpenses(
    userId,
    categories,
    from,
    to,
  );

  res.status(200).send(filteredExpenses);
};

const getOne = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = userService.getUserById(userId);

  if (!user || !spentAt || !title || !amount || !category || !note) {
    res.sendStatus(400);

    return;
  }

  const expense = expensesService.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.statusCode = 201;
  res.send(expense);
};

const remove = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  expensesService.deleteExpense(id);

  res.sendStatus(204);
};

const update = (req, res) => {
  const { id } = req.params;
  const expense = expensesService.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExpense = expensesService.updateExpense(id, req.body);

  if (!updatedExpense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(updatedExpense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
