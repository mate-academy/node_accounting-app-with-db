'use strict';

// const { v4: uuidv4 } = require('uuid');

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

// const { Client } = require('pg');
const { User } = require('../controllers/db/models/user.model');

// const client = new Client({
//   host: 'localhost',
//   user: 'postgres',
//   password: '123456',
//   database: 'postgres',
// });

// client.connect();

// function getRandomInt(max) {
//   return Math.floor(Math.random() * max);
// }

// let users = [
//   {
//     id: 1, name: 'Oleh',
//   },
// ];

// const clearUsers = () => {
//   users = [];
// };

const getAllUsers = () => {
  // const result = await client.query(`
  //   SELECT * FROM users1
  //   `);

  // return result.rows;
  // try {
  //   const result = await client.query(`
  //   SELECT * FROM users
  //   `);

  //   res.send(result.rows);
  //   // return result.rows;
  // } catch (err) {
  //   console.error('Error executing query:', err);

  //   res.status(500).send(err.message);
  //   // return err.message;
  // }
  return User.findAll();

  // return client.query(`
  // SELECT * FROM users
  // `);
};

// const getAllUsers = async(req, res) => {
//   try {
//     const result = await client.query(`
//     SELECT * FROM users
//     `);

//     res.send(result.rows);
//   } catch (err) {
//     console.error('Error executing query:', err);

//     res.status(500).send(err.message);
//   }
// };

// const getAllUsers = () => {
//   return users;
// };

const createUser = ({ id, name }) => {
  return User.create({
    id,
    name,
  });

  // return (id) => client.query(`
  // INSERT INTO users (id, name)
  // VALUES ('${id}', '${name}')
  // `);

  // const newUser = {
  //   id: uuidv4(),
  //   name: name,
  // };

  // users.push(newUser);

  // return newUser;
};

const getUserById = (id) => {
  // return client.query(`
  // SELECT * FROM users
  // WHERE id = '${id}'
  // `);
  return User.findByPk(id);
};

const deleteUserById = (id) => {
  return User.destroy({
    where: {
      id,
    },
  });

  // const user = users.find(person => person.id === id) || null;

  // if (!user) {
  //   return null;
  // }

  // users = users.filter(person => person.id !== id);

  // return user;
};

const updateUserById = (id, name) => {
  return User.update({
    name,
  }, {
    where: {
      id,
    },
  });

  // return client.query(`
  // UPDATE users
  // SET name='${name}'
  // WHERE id = '${id}'
  // `);
  // const user = users.find(person => person.id === id) || null;

  // if (!user) {
  //   return null;
  // }

  // Object.assign(user, fields);

  // return user;
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  deleteUserById,
  updateUserById,
  // clearUsers,
};
