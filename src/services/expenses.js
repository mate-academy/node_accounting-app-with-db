'use strict';

const client = require('./client.js');

async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM expenses
  `);

  return result.rows;
}

async function getById(expenseId) {
  const result = await client.query(`
    SELECT *
    FROM expenses
    WHERE id=$1
  `, [expenseId]);

  return result.rows[0] || null;
}

async function add(userId, title, amount, category, note) {
  const id = Math.max(0, ...getAll()
    .map(exp => exp.id)) + 1;

  await client.query(`
    INSERT INTO expenses (id, userid, amount, category, note)
    VALUES ($1, $2, $3, $4, $5. $6)
  `, [id, userId, title, amount, category, note]);

  const newExpense = await getById(id);

  return newExpense;
}

async function remove(expenseId) {
  await client.query(`
    DELETE FROM expenses
    WHERE id=$1
  `, [expenseId]);
}

async function update(expenseId, data) {
  const newExpense = await getById(expenseId);

  for (const key in newExpense) {
    newExpense[key] = data[key] ? data[key] : newExpense[key];
  }

  await client.query(`
  UPDATE expenses
  SET title=$1, amount=$3, category=$4, note=$5
  WHERE id=$2
  `, [
    newExpense.title,
    expenseId,
    newExpense.amount,
    newExpense.category,
    newExpense.note,
  ]);

  return newExpense;
}

module.exports = {
  getAll,
  add,
  remove,
  getById,
  update,
};
