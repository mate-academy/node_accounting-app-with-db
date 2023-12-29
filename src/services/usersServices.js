'use strict';

const { Client } = require('pg');
const uuidv4 = require('uuidv4');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1234',
  database: 'postgres',
});

client.connect();

const getAllUsers = async() => {
  const result = client.query(`
    Select * from users
  `);

  return result.rows;
};

const getUserById = async(userId) => {
  const result = await client.query(`
    Select * from users
    WHERE id = $1
  `, [userId]);

  return result.rows[0] || null;
};

const updateUser = async(userId, name) => {
  client.query(`
    UPDATE users
    SET name = $1
    WHERE id = $2
  `, [name, userId]);
};

const addUser = async(name) => {
  const id = uuidv4();

  client.query(`
    INSERT INTO users(id, name)
    values($1, $2)
  `, [id, name]);

  return getUserById(id);
};

const deleteUser = async(userId) => {
  client.query(`
    DELETE from users
    WHERE id = $1
  `, [userId]);
};

module.exports = {
  getAllUsers,
  getUserById,
  updateUser,
  addUser,
  deleteUser,
};
