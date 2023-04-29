'use strict';

const expenseServices = require('../services/expenses');
const userServices = require('../services/users');
const validateData = require('../utils/validateExpense');

const getAll = async(req, res) => {
  try {
    const expenses = await expenseServices.getAll();

    res.send(
      expenses.map(expenseServices.normalize),
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    const expense = await expenseServices.getOne(id);

    if (!expense) {
      res.sendStatus(404);

      return;
    }

    res.send(expenseServices.normalize(expense));
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const { userId } = req.body;

    const foundUser = await userServices.getOne(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const isDataValid = validateData(req.body);

    if (!isDataValid) {
      res.sendStatus(422);

      return;
    }

    const newExpense = await expenseServices.add(req.body);

    res.send(expenseServices.normalize(newExpense));
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    const foundExpense = await expenseServices.getOne(id);

    if (!foundExpense) {
      res.sendStatus(404);

      return;
    }

    await expenseServices.update(id, req.body);

    const updatedExpense = await expenseServices.getOne(id);

    if (!updatedExpense) {
      res.sendStatus(400);

      return;
    }

    res.send(updatedExpense);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    await expenseServices.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
