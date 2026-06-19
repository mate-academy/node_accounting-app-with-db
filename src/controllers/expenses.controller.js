const expenseService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const expenses = await expenseService.getAll(req.query);

    res.statusCode = 200;
    res.send(expenses);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getOne(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }
    res.statusCode = 200;
    res.send(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const create = async (req, res) => {
  const { userId } = req.body;

  try {
    const user = await userService.getOne(userId);

    if (!user) {
      res.sendStatus(400);

      return;
    }

    const expense = await expenseService.create(req.body);

    res.statusCode = 201;
    res.send(expense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseService.getOne(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    const updatedExpense = await expenseService.update(id, req.body);

    res.send(updatedExpense);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await expenseService.getOne(id))) {
    res.sendStatus(404);

    return;
  }

  try {
    await expenseService.remove(id);

    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
