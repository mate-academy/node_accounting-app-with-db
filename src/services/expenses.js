'use strict';

const generateUniqueId = require('generate-unique-id');

const { client } = require('../utils/db');

async function getAll() {
  const result = await client.query(`
  SELECT *
  FROM expenses
  ORDER BY spent_at
`);

  return result.rows;
};

async function getExpenseByCategory(category) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE category='${category}'
`);

  return result.rows;
}

async function getExpenseByUser(userId) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  INNER JOIN users
  ON users.id = expenses.user_id
  WHERE expenses.user_id='${userId}'
`);

  return result.rows;
}

async function getExpensesBetweenDates(from, to) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE spent_at::date >= '${from}'::date'
  AND spent_at::date <= '${to}'::date
`);

  return result.rows;
}

async function getExpenseById(expenseId) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE id='${expenseId}'
`);

  return result.rows[0] || null;
}

async function createExprense(userId, title, amount, category, note) {
  const id = Number(generateUniqueId({
    length: 8,
    useLetters: false,
  }));

  await client.query(`
    INSERT INTO expenses (id, user_id, title, amount, category, note)
    VALUES (
      '${id}', '${userId}', '${title}', '${amount}', '${category}', '${note}'
    )
  `);

  const newExpense = await getExpenseById(id);

  return newExpense;
}

async function removeExpense(expenseId) {
  await client.query(`
    DELETE FROM expenses
    WHERE id='${expenseId}'
  `);
}

async function updateExpense(
  foundExpense, id, userId, title, amount, category, note) {
  await client.query(`
    UPDATE expenses
    SET user_id='${userId}',
      title='${title}',
      amount='${amount}',
      category='${category}',
      note='${note}'
    WHERE id='${id}'
  `);
};

module.exports = {
  getAll,
  getExpenseById,
  createExprense,
  removeExpense,
  updateExpense,
  getExpenseByCategory,
  getExpenseByUser,
  getExpensesBetweenDates,
};
