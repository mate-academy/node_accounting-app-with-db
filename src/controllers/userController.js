'use strict';

const {
  generateUniqueID,
  findUser,
  getAllUsers,
  deleteUserById,
  addNewUser,
  updateUser,
} = require('../services/userService.js');
const { checkId } = require('../helpers.js');

const getUsers = async(req, res) => {
  const users = await getAllUsers();

  if (!users) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(users);
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = {
    id: generateUniqueID(),
    name,
  };

  await addNewUser(newUser);

  res.status(201).send(newUser);
};

const getUserById = async(req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundUser = await findUser(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.status(200).send(foundUser);
};

const deleteUser = async(req, res) => {
  const { id } = req.params;

  checkId(res, id);

  const foundUser = await deleteUserById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const modifyUser = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  checkId(res, id);

  const foundUser = await findUser(id);

  if (!name || !foundUser) {
    res.sendStatus(400);

    return;
  }

  await updateUser({ name }, id);

  res.sendStatus(204);
};

module.exports = {
  getUsers,
  createUser,
  getUserById,
  deleteUser,
  modifyUser,
};
