// IM NOT SURE IF THIS MIGHT BE NEEDED IN THE FUTURE SO I'M KILLING IT FOR NOW

// 'use strict';

// const pool = require('../dbConfig');

// const getCategories = async() => {
//   const res = await pool.query('SELECT * FROM categories');

//   return res.rows;
// };

// const createCategory = async(name) => {
//   const res = await pool
//     .query('INSERT INTO categories (name) VALUES ($1) RETURNING *', [name]);

//   return res.rows[0];
// };

// module.exports = {
//   getCategories,
//   createCategory,
// };
