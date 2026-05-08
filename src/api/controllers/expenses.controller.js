const { expensesService } = require('../service/expenses.service');
const { usersService } = require('../service/user.service');
const { Op } = require('sequelize');

const getAll = async (req, res) => {
  const { userId, categories, from, to } = req.query;
  const where = {};

  if (userId) {
    where.userId = userId;
  }

  if (categories) {
    const cats = categories.split(',').map((c) => c.trim());

    where.category = {
      [Op.in]: cats,
    };
  }

  if (from) {
    where.spentAt = { ...(where.spentAt || {}), [Op.gte]: from };
  }

  if (to) {
    where.spentAt = { ...(where.spentAt || {}), [Op.lte]: to };
  }

  const expenses = await expensesService.getAll(where);

  res.status(200);
  res.json(expenses);
};

const get = async (req, res) => {
  const expenseId = Number(req.params.id);

  if (isNaN(expenseId)) {
    return res.sendStatus(400);
  }

  const thisExpense = await expensesService.get(expenseId);

  if (!thisExpense) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(thisExpense);
};

const create = async (req, res) => {
  const { title, userId, amount, category, note, spentAt } = req.body;
  const normUserId = Number(userId);

  if (!title || isNaN(normUserId) || !amount || !spentAt) {
    return res.sendStatus(400);
  }

  const userExists = await usersService.get(Number(userId));

  if (!userExists) {
    return res.sendStatus(400);
  }

  const addedExpense = await expensesService.create(
    title,
    Number(userId),
    spentAt,
    amount,
    category,
    note,
  );

  res.status(201).json(addedExpense);
};

const remove = async (req, res) => {
  const thisExpenseId = Number(req.params.id);

  if (isNaN(thisExpenseId)) {
    return res.sendStatus(400);
  }

  const successfullDelete = await expensesService.deleteById(thisExpenseId);

  if (!successfullDelete) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { title, amount, category, note, spentAt } = req.body;
  const id = Number(req.params.id);

  if (isNaN(id)) {
    return res.sendStatus(400);
  }

  const updatedExpense = await expensesService.update({
    id,
    title,
    amount,
    category,
    note,
    spentAt,
  });

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(updatedExpense);
};

module.exports.expensesController = {
  getAll,
  get,
  create,
  remove,
  update,
};
