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
  WHERE category=$1
`, [category]);

  return result.rows;
}

async function getExpenseByUser(userId) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  INNER JOIN users
  ON users.id = expenses.user_id
  WHERE expenses.user_id=$1
`, [userId]);

  return result.rows;
}

async function getExpensesBetweenDates(from, to) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE spent_at::date >= $1::date'
  AND spent_at::date <= $2::date
`, [from, to]);

  return result.rows;
}

async function getExpenseById(expenseId) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE id=$1
`, [expenseId]);

  return result.rows[0] || null;
}

async function createExprense(userId, title, amount, category, note) {
  const id = Number(generateUniqueId({
    length: 8,
    useLetters: false,
  }));

  await client.query(`
    INSERT INTO expenses (id, user_id, title, amount, category, note)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [id, userId, title, amount, category, note]);

  const newExpense = await getExpenseById(id);

  return newExpense;
}

async function removeExpense(expenseId) {
  await client.query(`
    DELETE FROM expenses
    WHERE id=$1
  `, [expenseId]);
}

async function updateExpense(
  foundExpense, id, userId, title, amount, category, note) {
  await client.query(`
    UPDATE expenses
    SET user_id=$1, title=$2, amount=$3, category=$4, note=$5
    WHERE id=$6
  `, [userId, title, amount, category, note, id]);
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
