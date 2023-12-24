/* eslint-disable no-console */
'use strict';

const client = require('../db');

async function connect() {
  await client.connect();
}

connect().then(async() => {
  // Тут ви можете продовжити роботу з базою
  //  даних або викликати інші асинхронні операції
  // Наприклад, запуск вашого сервера Express, якщо це потрібно
  console.log('Connected to the database');

  const id = 1;

  // const result = await client.query(`
  //   SELECT * FROM expenses
  // `);

  const result1 = await client.query(`
    SELECT title FROM expenses
    WHERE id = $1
  `, [id]);

  console.log(result1.rows);
}).catch((error) => {
  console.error('Error connecting to the database:', error);
});

let users = [];

const getUsers = () => users;

const getUserById = (id) => {
  const normalizedId = parseInt(id);

  return users.find(user => user.id === normalizedId) || null;
};

const createUser = (name) => {
  const getMaxId = users[users.length - 1].id || 0;

  const user = {
    id: getMaxId + 1,
    name,
  };

  users.push(user);

  return user;
};

const deleteUser = (id) => {
  const normalizedId = parseInt(id);

  users = users.filter(user => user.id !== normalizedId);
};

const updateUser = ({ id, name }) => {
  const user = getUserById(id);

  Object.assign(user, { name });

  return user;
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  deleteUser,
  updateUser,
};
