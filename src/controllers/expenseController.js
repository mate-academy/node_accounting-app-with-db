/* eslint-disable max-len */
/* eslint-disable no-console */

const expenseService = require('../services/expenseService.js');
const userService = require('../services/userService.js');
const categoryService = require('../services/categoryService.js');
const { parseDate } = require('../helpers/dateHelper.js');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;

  const parsedFrom = from ? parseDate(from) : undefined;
  const parsedTo = to ? parseDate(to) : undefined;

  if ((from && parsedFrom === null) || (to && parsedTo === null)) {
    return res.status(400).send({ error: 'Invalid date format' });
  }

  const expenses = await expenseService.getAll(
    userId,
    categories,
    parsedFrom,
    parsedTo,
  );

  res.send(expenses);
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);
  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (
    userId === undefined ||
    !spentAt ||
    !title ||
    amount === undefined ||
    !category
  ) {
    return res.status(400).json({ message: 'No required data' });
  }

  if (parseDate(spentAt) === null) {
    return res.status(400).json({ message: 'Invalid date format' });
  }

  if (!Number.isInteger(Number(amount))) {
    return res.status(400).json({ message: 'Invalid amount format' });
  }

  const user = await userService.getById(userId);

  if (!user) {
    return res
      .status(400)
      .json({ message: `User with id=${userId} not found` });
  }

  if (category !== undefined) {
    const foundCategory = await categoryService.getByName(category);

    if (!foundCategory) {
      return res
        .status(400)
        .json({ message: `Category ${category} not found` });
    }
  }

  const newExpense = await expenseService.create({
    userId: Number(userId),
    spentAt,
    title,
    amount: Number(amount),
    category,
    note,
  });

  res.status(201).json(newExpense);
};

const remove = async (req, res) => {
  const id = Number(req.params.id);
  const removed = await expenseService.remove(id);

  if (!removed) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = Number(req.params.id);
  const { spentAt, title, amount, category, note } = req.body;

  const expense = await expenseService.getById(id);

  if (!expense) {
    return res.status(404).json({ message: 'Expense not found' });
  }

  if (
    spentAt === undefined &&
    title === undefined &&
    amount === undefined &&
    category === undefined &&
    note === undefined
  ) {
    return res.status(400).json({ message: 'No data to update' });
  }

  if (spentAt && parseDate(spentAt) === null) {
    return res.status(400).send({ error: 'Invalid date format' });
  }

  if (amount !== undefined && !Number.isInteger(amount)) {
    return res.status(400).send({ error: 'Invalid amount format' });
  }

  if (category !== undefined) {
    const foundCategory = await categoryService.getByName(category);

    if (!foundCategory) {
      return res
        .status(400)
        .json({ message: `Category ${category} not found` });
    }
  }

  const updatedExpense = await expenseService.update({
    id,
    spentAt,
    title,
    amount: amount !== undefined ? Number(amount) : undefined,
    category,
    note,
  });

  res.status(200).json(updatedExpense);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
