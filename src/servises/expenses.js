/* eslint-disable max-len */
'use strict';

const { client } = require('../utils/db');

async function getExpenses(userId) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE userid='${userId}'
  `);

  return result.rows;
}

async function getExpensesSpantAt() {
  const result = await client.query(`
  SELECT *
  FROM expenses
  `);

  return result.rows;
}

async function getExpensesCategory(userId, category) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE userid='${userId}' AND category='${category}'
  `);

  return result.rows;
}

async function getExpensesAll() {
  const result = await client.query(`
  SELECT *
  FROM expenses
  `);

  return result.rows;
}

async function insertExpense(id, userid, title, amount, category, note, spentat) {
  await client.query(`
  INSERT
  INTO expenses
  VALUES ('${id}', '${userid}', '${title}', '${amount}', '${category}', '${note}', '${spentat}');
  `);
}

async function deleteExpenseById(id) {
  await client.query(`
  DELETE
  FROM expenses
  WHERE id='${id}'
  `);
}

async function getExpenseById(id) {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE id='${id}'
  `);

  return result.rows;
}

async function patchExpenseById(id, title, amount, category, note, spentat) {
  const result = await client.query(`
  UPDATE expenses
  SET title='${title}', amount='${amount}', category='${category}', note='${note}', spentat='${spentat}'
  WHERE id='${id}'
 `);

  return result.rows;
}

module.exports = {
  getExpenses,
  getExpensesSpantAt,
  getExpensesCategory,
  getExpensesAll,
  insertExpense,
  deleteExpenseById,
  getExpenseById,
  patchExpenseById,
};
