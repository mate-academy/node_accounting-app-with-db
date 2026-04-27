const expensesService = require('../services/expenses.service');
const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const expenses = await expensesService.getAll(req.query);

  res
    .status(200)
    .send(expenses.map((expense) => expensesService.normalize(expense)));
};

const getOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).send(expensesService.normalize(expense));
};

const create = async (req, res) => {
  const required = ['userId', 'spentAt', 'title', 'amount'];

  const hasMissingField = required.some(
    (field) => req.body[field] === undefined,
  );

  if (hasMissingField) {
    return res.sendStatus(400);
  }

  const { userId, spentAt, title, amount, category, note } = req.body;
  const parsedUserId = Number(userId);

  if (!Number.isInteger(parsedUserId) || parsedUserId < 1) {
    return res.sendStatus(400);
  }

  const user = await usersService.getById(parsedUserId);

  if (!user) {
    return res.sendStatus(400);
  }

  if (
    typeof spentAt !== 'string' ||
    Number.isNaN(new Date(spentAt).getTime())
  ) {
    return res.sendStatus(400);
  }

  if (typeof title !== 'string' || title.trim() === '') {
    return res.sendStatus(400);
  }

  const parsedAmount = Number(amount);

  if (!Number.isInteger(parsedAmount) || parsedAmount < 1) {
    return res.sendStatus(400);
  }

  if (
    category != null &&
    (typeof category !== 'string' || category.trim() === '')
  ) {
    return res.sendStatus(400);
  }

  if (note != null && typeof note !== 'string') {
    return res.sendStatus(400);
  }

  const newExpense = await expensesService.create({
    userId: parsedUserId,
    spentAt: spentAt,
    title: title.trim(),
    amount: parsedAmount,
    category: category?.trim() || null,
    note: typeof note === 'string' ? note : null,
  });

  return res.status(201).send(newExpense);
};

const deleteOne = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.deleteById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = Number(req.params.id);

  if (!Number.isInteger(id) || id < 1) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getById(id);

  if (!expense) {
    return res.sendStatus(404);
  }

  const { userId, spentAt, title, amount, category, note } = req.body;

  const updateData = {};

  if (userId !== undefined) {
    const parsedUserId = Number(userId);

    if (!Number.isInteger(parsedUserId) || parsedUserId < 1) {
      return res.sendStatus(400);
    }

    updateData.userId = parsedUserId;
  }

  if (spentAt !== undefined) {
    if (typeof spentAt !== 'string') {
      return res.sendStatus(400);
    }

    const parsedDate = new Date(spentAt);

    if (Number.isNaN(parsedDate.getTime())) {
      return res.sendStatus(400);
    }

    updateData.spentAt = parsedDate;
  }

  if (title !== undefined) {
    if (typeof title !== 'string' || title.trim() === '') {
      return res.sendStatus(400);
    }

    updateData.title = title.trim();
  }

  if (amount !== undefined) {
    const parsedAmount = Number(amount);

    if (!Number.isInteger(parsedAmount) || parsedAmount < 1) {
      return res.sendStatus(400);
    }

    updateData.amount = parsedAmount;
  }

  if (category !== undefined) {
    if (
      category !== null &&
      (typeof category !== 'string' || category.trim() === '')
    ) {
      return res.sendStatus(400);
    }

    updateData.category = category?.trim() || null;
  }

  if (note !== undefined) {
    if (note !== null && typeof note !== 'string') {
      return res.sendStatus(400);
    }

    updateData.note = note ?? null;
  }

  const updatedExpense = await expensesService.update(id, updateData);

  return res.status(200).send(expensesService.normalize(updatedExpense));
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  deleteOne,
};
