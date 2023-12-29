'use strict';

const { Client } = require('pg');
const uuidv4 = require('uuidv4');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'postgres',
});

client.connect();

const getAllExpenses = () => {
  const result = client.query(`
    Select * from expenses
  `);

  return result.rows;
};

const getExpenseById = (expenseId) => {
  const result = client.query(`
  Select * from expenses
  WHERE id = $1
`, [expenseId]);

  return result.rows[0] || null;
};

const updateExpense
  = (expenseId, userId, spentAt, title, amount, category, note = 'empty') => {
    client.query(`
    UPDATE expenses
    SET userId = $1,
      spentAt = $2,
      title = $3,
      amount = $4,
      category = $5,
      note = $6
    WHERE id = $7
  `, [userId, spentAt, title, amount, category, note, expenseId]);
  };

const addExpense
  = (userId, spentAt, title, amount, category, note = 'empty') => {
    const id = uuidv4();

    client.query(`
    INSERT INTO expenses(id, userId, spentAt, title, amount, category, note)
    values($1, $2, $3, $4, $5, $6, $7)
  `, [id, userId, spentAt, title, amount, category, note]);

    return getExpenseById(id);
  };

const deleteExpense = (expenseId) => {
  client.query(`
    DELETE from expenses
    WHERE id = $1
  `, [expenseId]);
};

module.exports = {
  getAllExpenses,
  getExpenseById,
  updateExpense,
  addExpense,
  deleteExpense,
};
