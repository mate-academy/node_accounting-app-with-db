const expensesService = require('../services/expenses.services');

const statusCode = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,
  BAD_REQUEST: 400,
  NOT_FOUND: 404,
  INTERNAL_SERVER_ERROR: 500,
};

const getAll = async (req, res) => {
  const query = req.query;
  const expenses = await expensesService.get(query);

  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  res.statusCode = statusCode;
  res.send(expense);
};

const add = async (req, res) => {
  const body = req.body;
  const userId = parseInt(body.userId);

  if (!userId) {
    res.sendStatus(statusCode.BAD_REQUEST);

    return;
  }

  try {
    const expense = await expensesService.add(body);

    res.statusCode = statusCode.CREATED;
    res.send(expense);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    await expensesService.remove(id);

    res.sendStatus(statusCode.NO_CONTENT);
  } catch (error) {
    res.sendStatus(statusCode.NOT_FOUND);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(statusCode.NOT_FOUND);

    return;
  }

  try {
    const updatedExpense = await expensesService.update(expense.id, body);

    res.statusCode = statusCode.OK;
    res.send(updatedExpense);
  } catch (error) {
    res.status(statusCode.INTERNAL_SERVER_ERROR).send(error.message);
  }
};

module.exports = {
  getAll,
  add,
  getOne,
  remove,
  update,
};
