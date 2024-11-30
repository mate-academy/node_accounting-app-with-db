const { expenseSchema } = require('../schemas');
const { dynamicSchema } = require('../utils');
const { expensesService, usersService } = require('../services');

const getAll = async (req, res) => {
  const query = req.query;

  const expenses = await expensesService.getAll(query);

  res.json(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(404);

    return;
  }

  res.json(expense);
};

const create = async (req, res) => {
  const { error, value } = expenseSchema.validate(req.body, {
    allowUnknown: true,
  });

  if (error) {
    res.sendStatus(400);

    return;
  }

  const isUserExist = !!(await usersService.getById(value.userId));

  if (!isUserExist) {
    res.sendStatus(400);

    return;
  }

  const expense = await expensesService.create(value);

  res.status(201).json(expense);
};

const update = async (req, res) => {
  const { id } = req.params;

  const isExist = !!(await expensesService.getById(id));

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  const keys = Object.keys(req.body);

  if (keys.length === 0) {
    res.sendStatus(400);

    return;
  }

  const currentSchema = dynamicSchema(keys, expenseSchema);
  const { error, value } = currentSchema.validate(req.body);

  if (error) {
    res.sendStatus(400);

    return;
  }
  await expensesService.update(id, value);

  const updatedExpense = await expensesService.getById(id);

  res.json(updatedExpense);
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  const isExist = !!(await expensesService.getById(id));

  if (!isExist) {
    res.sendStatus(404);

    return;
  }

  await expensesService.deleteById(id);

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
