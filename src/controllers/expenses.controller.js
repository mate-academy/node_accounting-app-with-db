'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const { v4: uuidv4 } = require('uuid');
const expensesService = require('../services/expenses.service');
const usersService = require('../services/user.service');
const { Expense } = require('../controllers/db/models/expense.model');
// const { filterByQuery } = require('../utils/filter.expenses');

const getById = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await expensesService.getExpensesById(id);
    // console.log(result);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(result);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // const expense = expensesService.getExpensesById(Number(id));

  // if (!expense) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.send(expensesService.getExpensesById(Number(id)));
};

const gerAllIncludesQuery = async(req, res) => {
  const querys = req.query;

  const modelKeys = Object.keys(Expense.getAttributes());

  for (const query in querys) {
    if (!modelKeys.includes(query)) {
      res.status(404).send(`column ${query} does not exist`);
    }
  }

  try {
    const result = await expensesService.getAllExpenses(querys);

    res.send(result);
    // res.send(result.rows);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }
};
// const gerAllIncludesQuery = (req, res) => {
//   const query = req.query;
//   const expenses = expensesService.getAllExpenses();

//   if (!Object.keys(query).length) {
//     res.send(expenses);

//     return;
//   }

//   const filteredExpenses = filterByQuery(query, expenses);

//   res.send(filteredExpenses);
// };

const createExpense = async(req, res) => {
  const {
    userId,
    spentAt,
    title,
    amount,
    category,
    note,
  } = req.body;

  if (
    !userId
    || !title
    || !amount
    || !category
    || !(await usersService.getUserById(userId))
  ) {
    res.sendStatus(400);

    return;
  }

  const id = uuidv4();

  try {
    await expensesService.createExpenses({
      id,
      userId,
      spentAt,
      title,
      category,
      amount,
      note,
    });
    // await usersService.createUser(name)(id);

    const createdExpense = await expensesService.getExpensesById(id);

    res.send(createdExpense);

    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // res.status(201);
  // res.send(expensesService.createExpenses(req.body));
};

const deleteParticular = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    await expensesService.deleteExpensesById(id);

    res.send(`one expense with id ${id} was deleted`);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // const deletedUser = expensesService.deleteExpensesById(Number(id));

  // if (!deletedUser) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.sendStatus(204);
};

const updateParticular = async(req, res) => {
  const { id } = req.params;

  // const updatedUser = expensesService
  // .updateExpensesById(Number(id), req.body);

  // if (!updatedUser) {
  //   res.sendStatus(404);

  //   return;
  // }

  try {
    const updatedUser = await expensesService.updateExpensesById(id, req.body);

    // const updatedUser = await usersService.getUserById(id);

    if (!updatedUser[0]) {
      res.status(404);
      res.send(updatedUser);

      return;
    }

    res.send(updatedUser);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // res.send(updatedUser);
};

module.exports = {
  getById,
  gerAllIncludesQuery,
  createExpense,
  deleteParticular,
  updateParticular,
};
