'use strict';

const { client } = require('../utils/db');

const generateUniqueId = require('generate-unique-id');

async function getAll() {
  const result = await client.query(`
  SELECT *
  FROM users
  ORDER BY created_at
`);

  return result.rows;
};

async function getUserById(userId) {
  const result = await client.query(`
  SELECT *
  FROM users
  WHERE id='${userId}'
`);

  return result.rows[0] || null;
}

async function createUser(name) {
  const id = Number(generateUniqueId({
    length: 8,
    useLetters: false,
  }));

  await client.query(`
    INSERT INTO users (id, name)
    VALUES ('${id}', '${name}')
  `);

  const newUser = await getUserById(id);

  return newUser;
}

async function removeUser(userId) {
  await client.query(`
    DELETE FROM users
    WHERE id='${userId}'
  `);
};

async function updateUser({ id, name }) {
  await client.query(`
    UPDATE users
    SET name='${name}'
    WHERE id='${id}'
  `);

  const newUser = await getUserById(id);

  return newUser;
};

module.exports = {
  getUserById,
  createUser,
  removeUser,
  updateUser,
  getAll,
};
