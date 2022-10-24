'use strict';

const { client } = require('./postgreClient');

let newID = 1;

async function getAllUsers() {
  const result = await client.query(`
    SELECT *
    FROM users
    ORDER BY created_at
  `);

  return result.rows;
}

async function getUserByID(userID) {
  const foundedUser = await client.query(`
    SELECT *
    FROM users
    WHERE id = $1
  `, [userID]);

  return foundedUser.rows;
}

async function createUser(name) {
  const id = newID++;

  await client.query(`
    INSERT INTO users (id,name)
    VALUES ($1, $2)
  `, [id, name]);

  const newUser = await getUserByID(id);

  return newUser;
}

async function deleteUser(id) {
  const removedUser = await getUserByID(id);

  await client.query(`
  DELETE FROM users
  WHERE id = $1
`, [id]);

  return removedUser;
}

async function updateUser(userId, name) {
  await client.query(`
    UPDATE users
    SET name = $1
    WHERE id = $2
  `, [name, userId]);

  const newUser = await getUserByID(userId);

  return newUser;
}

module.exports = {
  getAllUsers,
  getUserByID,
  createUser,
  deleteUser,
  updateUser,
};
