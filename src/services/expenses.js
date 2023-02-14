/* eslint-disable max-len */
'use strict';

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1110',
});

client.connect();

const initialExpenses = () => {
  // eslint-disable-next-line no-console
  console.log('world');
};

const getAllExpenses = async(userId, category, from, to) => {
  const allExpenses = await client.query(`
  SELECT *
  FROM expenses
  ORDER BY id
  `);

  let filteredExpenses = allExpenses.rows;

  if (userId) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.userId === Number(userId));
  }

  if (category) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.category === category);
  }

  if (from) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt > from);
  }

  if (to) {
    filteredExpenses = filteredExpenses
      .filter(expense => expense.spentAt < to);
  }

  return filteredExpenses;
};

const getExpensesById = async(expenseId) => {
  const allExpenses = await client.query(`
  SELECT *
  FROM expenses
  WHERE id='${expenseId}'
  `);

  return allExpenses.rows[0] || null;
};

const addExpense = async(reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  const allExpenses = await client.query(`
  SELECT *
  FROM expenses
  `);

  const maxId = await Math.max(...allExpenses.rows.map(expense => expense.id));

  const id = await allExpenses.rows.length ? maxId + 1 : 0;

  await client.query(`
  INSERT INTO expenses
  VALUES ('${id}','${userId}','${spentAt}','${title}','${amount}','${category}','${note}')
  `);

  const newExpense = await getExpensesById(id);

  return newExpense;
};

const deleteExpense = async(expenseId) => {
  await client.query(`
  DELETE FROM expenses
  WHERE id='${expenseId}'
  `);
};

const updateExpense = async(foundExpense, reqBody) => {
  const { userId, spentAt, title, amount, category, note } = reqBody;

  await client.query(`
  UPDATE expenses
  SET user_id='${userId}', spent_at='${spentAt}', title='${title}', amount='${amount}', category='${category}', note='${note}'
  WHERE id='${foundExpense.id}'
  `);

  const updatedExpenses = await getExpensesById(foundExpense.id);

  return updatedExpenses;
};

module.exports = {
  initialExpenses,
  getAllExpenses,
  getExpensesById,
  addExpense,
  deleteExpense,
  updateExpense,
};
