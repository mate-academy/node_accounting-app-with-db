'use strict';

const {
  getAllUsers,
  getUserById,
  addUser,
  deleteUser,
  changeUser,
} = require('../services/users');

const getUsers = async(req, res) => {
  res.send(await getAllUsers());
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  res.statusCode = 201;
  res.send(await addUser(name));
};

const getUser = async(req, res) => {
  const { userId } = req.params;

  const foundedUser = await getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(await foundedUser);
};

const removeUser = async(req, res) => {
  const { userId } = req.params;

  const foundedUser = await getUserById(+userId);

  if (!foundedUser) {
    res.sendStatus(404);

    return;
  }

  await deleteUser(+userId);
  res.sendStatus(204);
};

const modifyUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  let user = await getUserById(+userId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  user = await changeUser(+userId, name);

  res.send(user);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  removeUser,
  modifyUser,
};
