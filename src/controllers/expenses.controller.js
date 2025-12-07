const expensesService = require('../services/expenses.service');
const userService = require('../services/user.service');

const get = async (req, res) => {
  let expenses = await expensesService.getAll(req.query);

  if (!expenses) {
    expenses = [];
  } else if (!Array.isArray(expenses)) {
    expenses = [expenses];
  }

  res.status(200).send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getOne(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expense);
};

const create = async (req, res) => {
  const data = req.body;

  if (data.userId === undefined) {
    return res.sendStatus(400);
  }

  const user = await userService.getOne(data.userId);

  if (!user) {
    return res.sendStatus(400);
  }

  try {
    const newExpense = await expensesService.create(data, user);

    res.status(201).send(newExpense);
  } catch (err) {
    return res.sendStatus(400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const data = req.body;

  const updatableFields = [
    'userId',
    'spentAt',
    'title',
    'amount',
    'category',
    'note',
  ];
  const hasFieldToUpdate = updatableFields.some(
    (field) => data[field] !== undefined,
  );

  if (!hasFieldToUpdate) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesService.update(id, data);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const deleted = await expensesService.remove(id);

  if (!deleted) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
