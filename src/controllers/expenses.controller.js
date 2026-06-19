const expensesServices = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  const expenses = await expensesServices.getAllExpenses(req.query);

  res.status(200).send(expenses);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (!spentAt || !title || amount < 0 || !userId || isNaN(userId)) {
    return res.status(400).send();
  }

  const findUser = await userService.getUserById(Number(userId));

  if (!findUser) {
    return res.status(400).send();
  }

  const newExpense = await expensesServices.createExpense(
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  );

  return res.status(201).send(newExpense);
};

const getById = async (req, res) => {
  const id = Number(req.params.id);

  if (!id) {
    return res.status(400).send();
  }

  const expense = await expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  return res.status(200).send(expense);
};

const removeExpenses = async (req, res) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send();
  }

  const expense = await expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  await expensesServices.deleteExpense(id);

  return res.status(204).send();
};

const update = async (req, res) => {
  const id = Number(req.params.id);

  if (!id || isNaN(id)) {
    return res.status(400).send();
  }

  const expense = await expensesServices.getExpenseById(id);

  if (!expense) {
    return res.status(404).send();
  }

  const [, [updatedExpense]] = await expensesServices.updateExpense(
    id,
    req.body,
  );

  return res.status(200).send(updatedExpense.dataValues);
};

module.exports = {
  get,
  create,
  getById,
  removeExpenses,
  update,
};
