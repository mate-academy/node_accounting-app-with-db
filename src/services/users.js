'use strict';

const { client } = require('../utils/db');

let nextUserId = 1;

function normalize({ id, name }) {
  return {
    id, name,
  };
}

async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY created_at
  `);

  return result.rows;
}

async function getOne(userId) {
  const result = await client.query(`
    SELECT *
    FROM users
    WHERE id=$1
    `, [userId]
  );

  return result.rows[0] || null;
}

async function create(name) {
  const userId = nextUserId++;

  await client.query(`
    INSERT INTO users (id, name)
    VALUES ($1, $2)
    `, [userId, name]
  );

  const newUser = await getOne(userId);

  return newUser;
}

async function remove(userId) {
  const foundedUser = await getOne(userId);

  await client.query(`
    DELETE
    FROM users
    WHERE id=$1
    `, [userId]
  );

  return foundedUser;
}

async function update(userId, name) {
  await client.query(`
    UPDATE users
    SET name=$2
    WHERE id=$1
    `, [userId, name]
  );

  const updatedUser = await getOne(userId);

  return updatedUser;
}

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
  normalize,
};
