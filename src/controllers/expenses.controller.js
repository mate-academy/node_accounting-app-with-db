const expensesService = require('../services/expenses.service.js');
const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  let arrCategories = categories;

  if (typeof arrCategories === 'string') {
    arrCategories = [categories];
  }

  const numberUserId = Number(userId);

  if (userId && Number.isNaN(numberUserId)) {
    return res.sendStatus(400);
  }

  const result = await expensesService.getByQuery({
    userId: numberUserId,
    categories: arrCategories,
    from,
    to,
  });

  res.send(result);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;

  if (userId === undefined || !spentAt || !title || amount === undefined) {
    return res.sendStatus(400);
  }

  const numberUserId = Number(userId);
  const numberAmount = Number(amount);

  const date = new Date(spentAt).getTime();

  if (Number.isNaN(numberUserId)) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(numberUserId);

  if (!user) {
    return res.sendStatus(400);
  }

  if (
    Number.isNaN(date) ||
    Number.isNaN(numberAmount) ||
    typeof title !== 'string' ||
    (category !== undefined && typeof category !== 'string') ||
    (note !== undefined && typeof note !== 'string')
  ) {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create({
    userId: numberUserId,
    spentAt,
    title,
    amount: numberAmount,
    category,
    note,
  });

  res.status(201).send(newExpense);
};

const getById = async (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(numberId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.send(expense);
};

const deleteById = async (req, res) => {
  const { id } = req.params;

  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const result = await expensesService.deleteById(numberId);

  if (!result) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { id } = req.params;
  const numberId = Number(id);

  if (Number.isNaN(numberId)) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(numberId);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { spentAt, amount } = req.body;

  const updateData = {};

  if (amount !== undefined) {
    const numberAmount = Number(amount);

    if (Number.isNaN(numberAmount)) {
      return res.sendStatus(400);
    }

    updateData.amount = numberAmount;
  }

  if (spentAt !== undefined) {
    const date = new Date(spentAt).getTime();

    if (Number.isNaN(date)) {
      return res.sendStatus(400);
    }

    updateData.spentAt = spentAt;
  }

  for (const field of ['title', 'category', 'note']) {
    const value = req.body[field];

    if (value === undefined) {
      continue;
    }

    if (typeof value !== 'string') {
      return res.sendStatus(400);
    }

    updateData[field] = value;
  }

  const updatedExpense = await expensesService.update(numberId, updateData);

  res.send(updatedExpense);
};

module.exports = {
  getAll,
  create,
  getById,
  deleteById,
  update,
};
