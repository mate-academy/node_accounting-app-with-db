'use strict';

const pool = require('../dbConfig');

const getCategories = async() => {
  const res = await pool.query('SELECT * FROM categories');

  return res.rows;
};

const createCategory = async(name) => {
  const res = await pool
    .query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);

  return res.rows[0];
};

// Implement remaining CRUD functions...

module.exports = {
  getCategories,
  createCategory,
  // ...
};
