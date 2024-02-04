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

const getAllUsers = async() => {
  const result = await client.query(`
  SELECT *
  FROM users
  ORDER BY id
  `);

  return result.rows;
};

const getUserById = async(userID) => {
  const result = await client.query(`
  SELECT *
  FROM users
  WHERE id = $1`, [userID]);

  return result.rows[0];
};

const createUser = async(name) => {
  if (!name) {
    return null;
  }

  const result = await client.query(`
  INSERT INTO "users" ("name")
  VALUES ($1)
  RETURNING id`, [name]);

  const id = result.rows[0].id;

  return getUserById(id);
};

const deleteUser = async(userID) => {
  const result = await client.query(`
  DELETE FROM users
  WHERE id=$1`, [userID]);

  if (result.rowCount !== 1) {
    return null;
  }

  return true;
};

const updateUser = async(userID, name) => {
  const result = await client.query(`
  UPDATE "users"
  SET "name"= $1
  WHERE id = $2
  RETURNING id`
  , [name, userID]);

  if (result.rowCount !== 1) {
    return null;
  }

  const id = result.rows[0].id;

  return getUserById(id);
};

module.exports = {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
  createUser,
};
