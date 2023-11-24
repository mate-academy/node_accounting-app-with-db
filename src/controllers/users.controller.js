'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const { Client } = require('pg');
const usersService = require('../services/user.service');
const { v4: uuidv4 } = require('uuid');

const client = new Client({
  host: 'localhost',
  user: 'postgres',
  password: '123456',
  database: 'postgres',
});

client.connect();

// const getAll = async(req, res) => {
//   try {
//     const result = await client.query(`
//     SELECT * FROM users
//     `);

//     res.send(result.rows);
//   } catch (err) {
//     console.error('Error executing query:', err);

//     res.status(500).send('Internal Server Error');
//   }
// };

const getAll = async(req, res) => {
  try {
    const result = await usersService.getAllUsers();

    res.send(result);
    // res.send(result.rows);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }
  // client.connect(() => {
  //   client.query(
  //     `
  //   SELECT * FROM users1;
  //   `,
  //     (err, result) => {
  //       if (err) {
  //         console.log(res);
  //       }
  //       res.send(result.rows);

  //       client.end();
  //     });
  // });

  // res.send(JSON.parse(usersFromServer));

  // res.send(await usersService.getAllUsers(req, res));
};

const getParticular = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  // const user = usersService.getUserById(Number(id));

  // if (!user) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.send(user);

  try {
    const result = await usersService.getUserById(id);
    // console.log(result);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(result);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }
};

const deleteParticular = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    await usersService.deleteUserById(id);

    res.send(`one user with id ${id} was deleted`);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // const deletedUser = usersService.deleteUserById(Number(id));

  // if (!deletedUser) {
  //   res.sendStatus(404);

  //   return;
  // }

  // res.sendStatus(204);
};

const updateParticular = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const updatedUser = await usersService.updateUserById(id, name);

    // const updatedUser = await usersService.getUserById(id);

    if (!updatedUser[0]) {
      res.status(404);
      res.send(updatedUser);

      return;
    }

    res.send(updatedUser);
    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const id = uuidv4();

  try {
    await usersService.createUser({
      id, name,
    });
    // await usersService.createUser(name)(id);

    const createdUser = await usersService.getUserById(id);

    res.send(createdUser);

    // return result.rows;
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
    // return err.message;
  }

  // res.status(201);
  // res.send(usersService.createUser(name));
};

module.exports = {
  getAll,
  createUser,
  getParticular,
  deleteParticular,
  updateParticular,
};
