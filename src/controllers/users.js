/* eslint-disable no-console */
'use strict';

const {
  getAllUsers,
  insertUser,
  getOneUser,
  deleteUser,
  patchUser,
} = require('../servises/users');

const getAll = async(req, res) => {
  const users = await getAllUsers();

  console.log(users);
  res.send(users);
};

const setUser = async(req, res) => {
  if (req.body.name) {
    const user = {
      id: null,
      name: '',
    };

    user.id = new Date().getTime();
    user.name = req.body.name;
    console.log(user.id, user.name);
    insertUser(user.id, user.name);

    res.statusCode = 201;
    res.send(user);

    return;
  };

  res.statusCode = 400;
  res.send('Bad request');
};

const getUserById = async(req, res) => {
  const user = await getOneUser(req.params.userId);

  if (!req.params.userId) {
    res.statusCode = 400;

    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }
  res.statusCode = 200;
  res.send(user);
};

const deleteUserById = async(req, res) => {
  const user = await getOneUser(req.params.userId);

  if (!req.params.userId) {
    res.statusCode = 400;

    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.send('Not found');

    return;
  }

  deleteUser(req.params.userId);
  res.statusCode = 204;
  res.send('No Content');
};

const patchUserById = async(req, res) => {
  const user = await getOneUser(req.params.userId);

  if (!req.body.name) {
    res.statusCode = 400;
    res.send('Bad Reques');

    return;
  }

  if (!user) {
    res.statusCode = 404;
    res.send('Not Found');

    return;
  }

  user[0].name = req.body.name;
  patchUser(user[0].id, user[0].name);

  res.send({
    id: user[0].id,
    name: user[0].name,
  });
};

module.exports = {
  getAll, setUser, getUserById, deleteUserById, patchUserById,
};
