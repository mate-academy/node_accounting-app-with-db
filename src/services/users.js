'use strict';

const { v4: uuid } = require('uuid');

const { db } = require('../db');

const resetStore = async () => {
  await db`DROP TABLE IF EXISTS users`;

  await db`
    CREATE TABLE users (
      id UUID PRIMARY KEY,
      name TEXT
    )
  `;
};

const getAll = async () => {
  return db`SELECT * FROM users`;
};

const getById = async (id) => {
  const response = await db`SELECT * FROM users WHERE id = ${id}`;

  return response[0];
};

const create = async (name) => {
  const response = await db`
    INSERT INTO users (id, name)
    VALUES (${uuid()}, ${name})
    RETURNING id
  `;

  return response[0];
};

const deleteById = async (id) => {
  const response = await db`
    DELETE FROM users
    WHERE id = ${id}
    RETURNING id
  `;

  return response[0];
};

const update = async (id, name) => {
  const response = await db`
    UPDATE users
    SET name = ${name}
    WHERE id = ${id}
    RETURNING *
  `;

  return response[0];
};

module.exports = {
  resetStore,
  getAll,
  getById,
  create,
  deleteById,
  update,
};
