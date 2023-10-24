'use strict';

const pool = require('./dbConfig');

const createCategory = async(name) => {
  const result = await pool
    .query('INSERT INTO categories(name) VALUES($1) RETURNING *', [name]);

  return result.rows[0];
};

const getCategoryById = async(id) => {
  const result = await pool
    .query('SELECT * FROM categories WHERE id = $1', [id]);

  return result.rows[0];
};

const updateCategory = async(id, name) => {
  const result = await pool
    .query(
      'UPDATE categories SET name = $1 WHERE id = $2 RETURNING *',
      [name, id]
    );

  return result.rows[0];
};

const deleteCategory = async(id) => {
  const result = await pool
    .query('DELETE FROM categories WHERE id = $1 RETURNING *', [id]);

  return result.rows[0];
};

module.exports = {
  createCategory,
  getCategoryById,
  updateCategory,
  deleteCategory,
};
