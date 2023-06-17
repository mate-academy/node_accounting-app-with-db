'use strict';

const { v4: uuid } = require('uuid');

const { db } = require('../../db');

const { validateExpenseData } = require('./validation');

const resetStore = async () => {
  await db`DROP TABLE IF EXISTS expenses`;

  await db`CREATE TABLE expenses (
    id UUID PRIMARY KEY,
    userId UUID,
    title TEXT,
    category TEXT,
    amount NUMERIC,
    spentAt TIMESTAMP,
    note TEXT
  )`;
};

const getAll = async ({ userId, categories, from, to }) => {
  return db`
    SELECT *
    FROM expenses
    WHERE
      userId = ${userId}
      AND
      spentAt BETWEEN ${from} AND ${to}
      AND
      category IN (${categories.join(', ')})
  `;
};

const getById = async (id) => {
  const response = await db`SELECT * FROM expenses WHERE id = ${id}`;

  return response[0];
};

const create = async (expenseData) => {
  validateExpenseData(expenseData);

  const { userId, spentAt, title, amount, category, note } = expenseData;

  const response = await db`
    INSERT INTO expenses (id, userId, spentAt, title, amount, category, note)
    VALUES (
      ${uuid()},
      ${userId},
      ${spentAt},
      ${title},
      ${amount},
      ${category},
      ${note}
    )
    RETURNING *
  `;

  return response[0];
};

const deleteById = async (id) => {
  const response = await db`
    DELETE FROM expenses
    WHERE id = ${id}
    RETURNING id
  `;

  return response[0];
};

const update = async (id, updatedExpense) => {
  const { title, amount, category, note, spentAt } = updatedExpense;

  const response = await db`
    UPDATE expenses
    SET
      title = ${title},
      amount = ${amount},
      category = ${category},
      note = ${note},
      spentAt = ${spentAt}
    WHERE id = ${id}
    RETURNING *
  `;

  return response[0];
};

module.exports = {
  resetStore,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
