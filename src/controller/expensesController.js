const serviceExpenses = require('../services/expensesServise');
const serviceUsers = require('../services/usersService');

const get = async (req, res) => {
  const expenses = await serviceExpenses.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const data = req.body;
  const user = await serviceUsers.getUserById(data.userId);

  if (!user) {
    res.sendStatus(400);

    return;
  }

  const expense = await serviceExpenses.createExpense(data);

  res.status(201).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  await serviceExpenses.removeExpense(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { spentAt, title, amount, category, note } = req.body;
  const { id } = req.params;
  const expense = await serviceExpenses.getExpenseById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  const updatedExp = await serviceExpenses.updateExpense(id, {
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
