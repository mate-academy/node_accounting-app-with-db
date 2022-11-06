'use strict';

const { client } = require('../utils/db');

async function getAllUsers() {
  const result = await client.query(`
    SELECT *
    FROM users
  `);

  return result.rows;
}

async function insertUser(id, name) {
  await client.query(`
  INSERT INTO users
  VALUES ('${id}', '${name}');
  `);
}

async function getOneUser(id) {
  const result = await client.query(`
  SELECT *
  FROM users
  WHERE id='${id}'
  `);

  return result.rows;
}

async function deleteUser(id) {
  await client.query(`
  DELETE
  FROM users
  WHERE id='${id}'
  `);
}

async function patchUser(id, name) {
  const result = await client.query(`
  UPDATE users
  SET name = '${name}'
  WHERE id='${id}'
 `);

  return result.rows;
}

module.exports = {
  getAllUsers,
  insertUser,
  getOneUser,
  deleteUser,
  patchUser,
};
