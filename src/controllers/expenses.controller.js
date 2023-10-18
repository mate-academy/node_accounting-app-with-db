'use strict';

const {
  BAD_REQUEST,
  NOT_FOUND,
  CREATED_SUCCESS,
  NO_CONTENT_SUCCESS,
} = require('../../constants/statusCodes');
const expensesService = require('./../services/expenses.service');
const usersService = require('./../services/users.service');

const getAllByQuery = async(req, res) => {
  const {
    userId,
    from,
    to,
    categories,
  } = req.query;

  let categoriesArray;

  if (categories) {
    categoriesArray = Array.isArray(categories)
      ? [...categories]
      : [categories];
  }

  const expenses = await expensesService.getAllByQuery({
    userId,
    categoriesArray,
    from,
    to,
  });

  res.send(expenses);
};

const create = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  const user = await usersService.getById(Number(userId));

  if (!user) {
    res.sendStatus(BAD_REQUEST);

    return;
  }

  const newExpense = {
    id: Number(new Date()),
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  };

  const expense = await expensesService.add(newExpense);

  res.statusCode = CREATED_SUCCESS;

  res.send(expense);
};

const getById = async(req, res) => {
  const id = Number(req.params.id);

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  res.send(expense);
};

const remove = async(req, res) => {
  const id = Number(req.params.id);

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await expensesService.remove(id);

  res.sendStatus(NO_CONTENT_SUCCESS);
};

const update = async(req, res) => {
  const id = Number(req.params.id);

  const expense = await expensesService.getById(id);

  if (!expense) {
    res.sendStatus(NOT_FOUND);

    return;
  }

  await expensesService.updateById(id, req.body);

  const updatedExpense = await expensesService.getById(id);

  res.send(updatedExpense);
};

module.exports = {
  getAllByQuery,
  create,
  getById,
  remove,
  update,
};
