const expensesServices = require('../services/expensesService.js');
const usersServices = require('../services/usersService.js');

const get = async (req, res) => {
  const { userId, from, to, categories } = req.query;

  const categoriesArray = categories ? categories.split(',') : undefined;

  const filteredExpenses = await expensesServices.getAllExpenses(
    userId,
    categoriesArray,
    from,
    to,
  );

  res.send(filteredExpenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesServices.getExpensesById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  const userExists = await usersServices.getUserById(userId);

  if (!userExists) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  res.status(201).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!expensesServices.getExpensesById(id)) {
    res.sendStatus(404);

    return;
  }

  await expensesServices.deleteExpense(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const expense = await expensesServices.updateExpense({ id, title });

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(expense);
};

module.exports = {
  get,
  getOne,
  create,
  remove,
  update,
};
