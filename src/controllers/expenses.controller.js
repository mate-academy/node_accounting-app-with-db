const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    res.statusCode = 200;
    res.send(await expenseService.getAll(req.query));
  } catch (error) {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expenseService.getOne(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  try {
    res.statusCode = 200;
    res.send(expense);
  } catch (error) {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const createExpense = async (req, res) => {
  const { userId } = req.body;

  if (!(await userService.getOne(userId))) {
    res.sendStatus(400);

    return;
  }

  try {
    res.statusCode = 201;
    res.send(await expenseService.createExpense(req.body));
  } catch (error) {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getOne(id))) {
    res.sendStatus(404);

    return;
  }

  try {
    res.send(await expenseService.updateExpense(id, req.body));
  } catch (error) {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeExpense = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getOne(id))) {
    res.sendStatus(404);

    return;
  }

  try {
    await expenseService.removeExpense(id);
    res.sendStatus(204);
  } catch (error) {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createExpense,
  updateExpense,
  removeExpense,
};
