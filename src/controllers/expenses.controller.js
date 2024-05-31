const status = require('../constants');
const expensesService = require('../services/expenses.service');
const userService = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req);

  res.statusCode = status.OK;
  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(status.BAD_REQUEST);
  }

  const expense = await expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  res.send(expense);
};

const create = async (req, res) => {
  const { title, spentAt, userId, amount } = req.body;
  const isParamsValid = !title || !amount || !spentAt;

  if (isParamsValid) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  const user = await userService.getOne(userId);

  if (!user) {
    return res.sendStatus(status.BAD_REQUEST);
  }

  try {
    const newExpense = await expensesService.createOne(req.body);

    res.statusCode = status.CREATED;
    res.send(newExpense);
  } catch (error) {
    res.sendStatus(status.NOT_FOUND);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  let expense = await expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  expense = await expensesService.updateOne(id, req.body);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }

  res.status(status.OK).send(expense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getOne(+id);

  if (!expense) {
    return res.sendStatus(status.NOT_FOUND);
  }
  await expensesService.deleteOne(id);

  res.sendStatus(status.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
