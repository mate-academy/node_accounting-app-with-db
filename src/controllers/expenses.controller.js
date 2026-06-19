const expensesService = require('../services/expense.service');
const { Op } = require('sequelize');

const getExpenseById = async (req, res) => {
  const expenseId = Number(req.params.expenseId);

  if (!expenseId) {
    return res.sendStatus(400);
  }

  const expense = await expensesService.getExpenseByIDService(expenseId);

  if (!expense) {
    return res.sendStatus(404);
  }

  res.status(200).json(expense);
};

const getExpenseByFilter = async (req, res) => {
  const id = Number(req.query.expenseId);
  const userId = Number(req.query.userId);
  const category = req.query.categories;
  const dateFrom = req.query.from ? new Date(req.query.from) : null;
  const dateTo = req.query.from ? new Date(req.query.to) : null;
  const spentAt = dateFrom && dateTo && { [Op.between]: [dateFrom, dateTo] };

  const expenseFilter = {
    ...(id && { id }),
    ...(userId && { userId }),
    ...(category && { category }),
    ...(spentAt && { spentAt }),
  };

  const expenses =
    await expensesService.getExpenseByFilterService(expenseFilter);

  if (!expenses) {
    return res.sendStatus(404);
  }
  res.status(200).json(expenses);
};

const createExpense = async (req, res) => {
  const userId = req.body.userId ? Number(req.body.userId) : null;
  const spentAt = req.body.spentAt ? new Date(req.body.spentAt) : null;
  const title = req.body.title ? req.body.title : null;
  const amount = req.body.amount ? Number(req.body.amount) : null;
  const category = req.body.category ? req.body.category : null;
  const note = req.body.note ? req.body.note : null;

  const validateInput = [userId, spentAt, title, amount].every(
    (d) => d !== null && !(isNaN(d) && typeof d === 'number'),
  );

  if (!validateInput) {
    return res.status(400).json({ error: 'Invalid input' });
  }

  const expenseData = {
    ...(userId && { userId }),
    ...(spentAt && { spentAt }),
    ...(title && { title }),
    ...(amount && { amount }),
    ...(category && { category }),
    ...(note && { note }),
  };

  const createdExpense =
    await expensesService.createExpenseService(expenseData);

  if (!createdExpense) {
    return res.sendStatus(400);
  }

  res.status(201).json(createdExpense);
};

const updateExpense = async (req, res) => {
  const id = req.params.expenseId ? Number(req.params.expenseId) : null;
  const userId = req.body.userId ? Number(req.body.userId) : null;
  const spentAt = req.body.spentAt ? new Date(req.body.spentAt) : null;
  const title = req.body.title ? req.body.title : null;
  const amount = req.body.amount ? Number(req.body.amount) : null;
  const category = req.body.category ? req.body.category : null;
  const note = req.body.note ? req.body.note : null;

  const expenseData = {
    ...(id && { id }),
    ...(userId && { userId }),
    ...(spentAt && { spentAt }),
    ...(title && { title }),
    ...(amount && { amount }),
    ...(category && { category }),
    ...(note && { note }),
  };

  const updatedExpense =
    await expensesService.updateExpenseService(expenseData);

  if (!updatedExpense) {
    return res.sendStatus(404);
  }

  res.status(200).json(updatedExpense);
};

const deleteExpense = async (req, res) => {
  const expenseId = Number(req.params.expenseId);

  const deletedExpense = expensesService.deleteExpenseService(expenseId);

  if (!deletedExpense) {
    return res.sendStatus(404);
  }
  res.status(204).json(deletedExpense);
};

const expensesController = {
  getExpenseById,
  getExpenseByFilter,
  createExpense,
  updateExpense,
  deleteExpense,
};

module.exports = expensesController;
