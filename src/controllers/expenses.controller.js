// const { User } = require('../models/User.model');
const expensesService = require('../services/expenses.service');
const { getById } = require('../services/users.service');
const HTTP_STATUS_CODES = require('../variables/httpStatusCodes');

const getAll = async (req, res) => {
  const { query } = req;

  const expenses = await expensesService.getAll(query);

  res.send(expenses);
};

const getOne = async (req, res) => {
  const { id } = req.params;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  res.statusCode = HTTP_STATUS_CODES.OK;
  res.send(expense);
};

const create = async (req, res) => {
  const { userId, spentAt, title, amount, category, note } = req.body;
  const user = await getById(userId);

  if (!user || !spentAt || !title || !amount) {
    res.sendStatus(HTTP_STATUS_CODES.BAD_REQUEST);

    return;
  }

  const expense = await expensesService.create({
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  });

  res.statusCode = HTTP_STATUS_CODES.CREATED;
  res.send(expense);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  const updatedExpense = await expensesService.update(id, body);

  res.statusCode = HTTP_STATUS_CODES.OK;

  res.send(updatedExpense);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(HTTP_STATUS_CODES.NOT_FOUND);

    return;
  }

  await expensesService.remove(id);
  res.sendStatus(HTTP_STATUS_CODES.NO_CONTENT);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
