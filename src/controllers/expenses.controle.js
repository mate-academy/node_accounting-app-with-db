/* eslint-disable no-console */
const expensesService = require('../services/expenses.srvice');
const usersService = require('../services/users.service');

const get = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  let expenses = await expensesService.getAll();

  if (userId) {
    expenses = expenses.filter((expense) => {
      return expense.userId === Number(userId);
    });
  }

  if (categories) {
    const categoriesArray = categories.split(',');

    expenses = expenses.filter((expense) => {
      return categoriesArray.includes(expense.category);
    });
  }

  if (from) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) >= new Date(from),
    );
  }

  if (to) {
    expenses = expenses.filter(
      (expense) => new Date(expense.spentAt) <= new Date(to),
    );
  }

  res.send(expenses.map(expensesService.normalize));
};

const post = async (req, res) => {
  try {
    console.log(req.body);

    const { userId, spentAt, title, amount, category, note } = req.body;

    if (userId === undefined || !spentAt || !title || amount === undefined) {
      console.log('Validation failed');

      return res.sendStatus(400);
    }

    const user = await usersService.getById(userId);

    if (!user) {
      console.log('User not found');

      return res.sendStatus(400);
    }

    const expense = await expensesService.createExpense(
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    );

    return res.status(201).send(expensesService.normalize(expense));
  } catch (error) {
    console.error(error);

    return res.status(500).json(error);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expensesService.normalize(expense));
};

const remove = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  await expensesService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  if ('id' in req.body || 'userId' in req.body) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesService.update({
    id,
    ...req.body,
  });

  res.send(expensesService.normalize(updatedExpense));
};

module.exports = {
  get,
  post,
  getOne,
  remove,
  update,
};
