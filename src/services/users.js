'use strict';

const { client } = require('../utils/db');

function normalize({ id, name }) {
  return {
    id, name,
  };
}

async function getAll() {
  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY id
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
  await client.query(`
    INSERT INTO users(name)
    VALUES ($1)
    `, [name]
  );

  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY id DESC
    LIMIT 1
  `);

  return result.rows[0];
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
