'use strict';

/* eslint no-console: ["error", { allow: ["warn", "error"] }] */

const usersService = require('../services/user.service');

const getAll = async(req, res) => {
  try {
    const result = await usersService.getAllUsers();

    res.send(result.map(user => usersService.normalizeUserData(user)));
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const getParticular = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await usersService.getUserById(id);

    if (!result) {
      res.sendStatus(404);

      return;
    }

    res.send(usersService.normalizeUserData(result));
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
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
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
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

    if (!updatedUser[0]) {
      res.status(404);
      res.send(updatedUser);

      return;
    }

    res.send(updatedUser);
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const createdUser = await usersService.createUser({ name });

    res.send(createdUser);
  } catch (err) {
    console.error('Error executing query:', err);

    res.status(500).send(err.message);
  }
};

module.exports = {
  getAll,
  createUser,
  getParticular,
  deleteParticular,
  updateParticular,
};
