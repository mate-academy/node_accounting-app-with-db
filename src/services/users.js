'use strict';

const { Client } = require('pg');
const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '1110',
});

client.connect();

const initialUsers = () => {
  // eslint-disable-next-line no-console
  console.log('hello');
};

const getAllUsers = async() => {
  const allUsers = await client.query(`
  SELECT *
  FROM users
  ORDER BY id
  `);

  return allUsers.rows;
};

const getUserById = async(userId) => {
  const allUsers = await client.query(`
  SELECT *
  FROM users
  WHERE id='${userId}'
  `);

  return allUsers.rows[0] || null;
};

const addUser = async(name) => {
  const allUsers = await client.query(`
  SELECT *
  FROM users
  `);

  const maxId = await Math.max(...allUsers.rows.map(user => user.id));

  const id = await allUsers.rows.length ? maxId + 1 : 0;

  await client.query(`
  INSERT INTO users (id, name)
  VALUES ('${id}','${name}')
  `);

  const newUser = await getUserById(id);

  return newUser;
};

const deleteUser = async(userId) => {
  await client.query(`
  DELETE FROM users
  WHERE id='${userId}'
  `);
};

const updateUser = async(foundUser, name) => {
  await client.query(`
  UPDATE users
  SET name='${name}'
  WHERE id='${foundUser.id}'
  `);

  const updatedUser = await getUserById(foundUser.id);

  return updatedUser;
};

module.exports = {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  updateUser,
  initialUsers,
};
