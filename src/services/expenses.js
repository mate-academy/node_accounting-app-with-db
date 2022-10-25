'use strict';

const { client } = require('../utils/dataBase');

function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

async function getAllExpenses() {
  const result = await client.query(`
  SELECT *
  FROM public.expenses
  `);

  return result.rows;
}

async function getExpenseById(expenseId) {
  const result = await client.query(`
  SELECT *
  FROM public.expenses
  WHERE id = $1
  `, [expenseId]);

  return result.rows[0] || null;
}

async function createNewExpense(
  userId,
  title,
  amount,
  category,
  note,
) {
  const id = uniqueID();

  await client.query(`
  INSERT INTO expenses(id, user_id, title, amount, category, note)
  VALUES ($1, $2, $3, $4, $5, $6)
  `, [id, userId, title, amount, category, note]);

  const newExtense = await getExpenseById(id);

  return newExtense;
}

async function removeExpenses(expenseId) {
  await client.query(`
  DELETE FROM expenses
  WHERE id=$1
  `, [expenseId]);
}

async function updateExpenses({ expenseId, title }) {
  await client.query(`
  UPDATE expenses
  SET title=$1
  WHERE id=$2
  `, [title, expenseId]);

  const newExtense = await getExpenseById(expenseId);

  return newExtense;
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpenses,
  removeExpenses,
  createNewExpense,
};
