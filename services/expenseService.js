'use strict';

const pg = require('pg');

const { Client } = pg;

const client = new Client({
  password: 'data123',
  host: 'localhost',
  user: 'postgres',
});

const connect = async() => {
  await client.connect();
};

connect();

const getExpenses = async(userId, categories, from, to) => {
  let query = `SELECT *
  FROM expenses
  WHERE 1=1`;

  const params = [];

  if (userId) {
    query += ` AND "userId" = $${params.push(userId)}`;
  }

  if (Array.isArray(categories)) {
    query += ` AND category = ANY($${params.push(categories)})`;
  } else if (typeof categories === 'string') {
    query += ` AND category = $${params.push(categories)}`;
  }

  if (from) {
    query += ` AND "spentAt" >= $${params.push(new Date(from))}`;
  }

  if (to) {
    query += ` AND "spentAt" <= $${params.push(new Date(to))}`;
  }

  query += ` ORDER BY id`;

  const result = await client.query(query, params);

  return result.rows;
};

const getExpenseById = async(id) => {
  const result = await client.query(`
  SELECT *
  FROM expenses
  WHERE id = $1`, [id]);

  return result.rows[0];
};

const createExpense = async(userId, spentAt, title, amount, category, note) => {
  const result = await client.query(`
  INSERT INTO expenses ("userId", "spentAt", title, amount, category, note)
  VALUES ($1, $2, $3, $4, $5, $6)
  RETURNING id`,
  [userId, spentAt, title, amount, category, note]);

  const id = result.rows[0].id;

  return getExpenseById(id);
};

const updateExpense = async(id, spentAt, title, amount, category, note) => {
  const params = [];

  let query = `UPDATE "expenses"
  SET`;

  if (spentAt) {
    query += ` "spentAt" = $${params.push(spentAt)},`;
  }

  if (title) {
    query += ` "title" = $${params.push(title)},`;
  }

  if (amount) {
    query += ` "amount" = $${params.push(amount)},`;
  }

  if (category) {
    query += ` "category" = $${params.push(category)},`;
  }

  if (note) {
    query += ` "note" = $${params.push(note)},`;
  }

  query = query.slice(0, -1);
  query += ` WHERE id = $${params.push(id)} RETURNING id`;

  const result = await client.query(query, params);
  const updatedId = result.rows[0].id;

  return getExpenseById(updatedId);
};

const deleteExpense = async(id) => {
  const result = await client.query(`
  DELETE FROM expenses
  WHERE id=$1`, [id]);

  if (result.rowCount !== 1) {
    return null;
  }

  return true;
};

module.exports = {
  getExpenses,
  getExpenseById,
  deleteExpense,
  createExpense,
  updateExpense,
};
