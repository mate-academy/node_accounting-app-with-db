'use strict';

const { client } = require('./postgreClient');

let newIDExp = 1;

async function getAllExpenses() {
  const expenses = await client.query(`
    SELECT *
    FROM expenses
  `);

  return expenses.rows;
}

async function getExpenseById(id) {
  const foundedExpense = await client.query(`
    SELECT *
    FROM expenses
    WHERE id = $1
  `, [id]);

  return foundedExpense.rows;
}

async function updateExpense(newExpense, updatedKeys) {
  for (const key in updatedKeys) {
    newExpense[key] = (updatedKeys[key]) ? updatedKeys[key] : newExpense[key];
  }

  await client.query(`
    UPDATE expenses
    SET userid = $2, category=$3, note=$4, amount=$5, title =$6
    WHERE id = $1
  `, [newExpense.id,
    newExpense.userid,
    newExpense.category,
    newExpense.note,
    newExpense.amount,
    newExpense.title]);
}

async function createExpense(userid, amount, category, note, title) {
  const id = newIDExp++;

  await client.query(`
    INSERT INTO expenses (id,userid, amount, category, note, title)
    VALUES ($1, $2, $3, $4, $5, $6)
  `, [id, userid, amount, category, note, title]);

  const newUser = await getExpenseById(id);

  return newUser;
}

async function deleteExpense(id) {
  await client.query(`
  DELETE FROM expenses
  WHERE id = $1
`, [id]);
}

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  createExpense,
  deleteExpense,
};
