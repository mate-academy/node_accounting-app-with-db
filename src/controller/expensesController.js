/* eslint-disable no-console */
/* eslint-disable no-shadow */
'use strict';

const serviceExpense = require('../service/expenses.js');
const serviceUser = require('../service/users.js');
const serviceCategory = require('../service/category.js');

const getAllExpenses = async (req, res) => {
  try {
    const query = req.query;

    if (query && Object.keys(query).length > 0) {
      const expenses = await serviceExpense.getByQuery(query);

      return res.send(expenses);
    }

    const expenses = await serviceExpense.getAllExpenses();

    res.send(expenses);
  } catch (error) {
    console.error('Error in getAllExpenses:', error);
    res.status(500).send({ error: error.message });
  }
};

const getExpenseById = async (req, res) => {
  try {
    const id = req.params.id;

    if (!id) {
      return res.status(400).send('Expense ID is required');
    }

    const expense = await serviceExpense.getExpenseById(id);

    if (!expense) {
      return res.status(404).send('Expense not found');
    }

    res.status(200).send(expense);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const createExpense = async (req, res) => {
  try {
    const { userId, spentAt, title, amount, category, note } = req.body;

    if (
      !title ||
      !spentAt ||
      !amount ||
      !(await serviceUser.getUserById(+userId))
    ) {
      res.sendStatus(400);

      return;
    }

    const newExpense = await serviceExpense.createExpense({
      userId,
      spentAt,
      title,
      amount,
      category,
      note,
    });

    res.statusCode = 201;
    res.send(newExpense);
  } catch (error) {
    return res.status(500).send({ error: error.message });
  }
};
const deleteExpense = async (req, res) => {
  try {
    const { id } = req.params;

    const expense = await serviceExpense.getExpenseById(+id);

    if (!expense) {
      return res.sendStatus(404);
    }

    await serviceExpense.deleteExpense(+id);
    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

const updateExpense = async (req, res) => {
  try {
    const id = req.params.id;
    const { spentAt, title, amount, category, note } = req.body;

    if (!id) {
      return res.status(400).send('Expense ID is required');
    }

    const existingExpense = await serviceExpense.getExpenseById(+id);

    if (!existingExpense) {
      return res.status(404).send('Expense not found');
    }

    const dataToUpdate = {};

    if (spentAt !== undefined) {
      dataToUpdate.spentAt = spentAt;
    }

    if (title !== undefined) {
      dataToUpdate.title = title;
    }

    if (amount !== undefined) {
      dataToUpdate.amount = amount;
    }

    if (note !== undefined) {
      dataToUpdate.note = note;
    }

    if (category !== undefined) {
      const foundCategory = await serviceCategory.getCategoryByName(category);

      if (!foundCategory) {
        return res.status(400).send('Category not found');
      }

      dataToUpdate.categoryId = foundCategory.id;
    }

    await serviceExpense.updateExpense(+id, dataToUpdate);

    const updatedExpense = await serviceExpense.getExpenseById(+id);

    res.send(updatedExpense);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  createExpense,
  deleteExpense,
  updateExpense,
};
