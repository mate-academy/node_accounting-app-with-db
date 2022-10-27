'use strict';

const client = require('./client.js');

async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY id
  `);

  return result.rows;
};

async function getById(userId) {
  const result = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1
  `, [userId]);

  return result.rows[0] || null;
}

async function add(name) {
  const id = Math.max(0, ...getAll().map(user => user.id)) + 1;

  await client.query(`
    INSERT INTO users (id, name)
    VALUES ($1, $2)
  `, [id, name]);

  const newUser = await getById(id);

  return newUser;
}

async function remove(userId) {
  await client.query(`
    DELETE FROM users
    WHERE id=$1
  `, [userId]);
}

async function update(userId, data) {
  await client.query(`
    UPDATE users
    SET name=$1
    WHERE id=$2
  `, [data, userId]);

  const newUser = await getById(userId);

  return newUser;
}

module.exports = {
  getAll,
  getById,
  add,
  remove,
  update,
};
