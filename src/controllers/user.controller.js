/* eslint-disable no-console */
'use strict';

const userService = require('../services/users.service');

const get = async(req, res) => {
  try {
    const allUsers = await userService.getAllUsers();

    if (!allUsers) {
      res.status(404).send('Not Found: The specified entity does not exist');
    }

    res.send(allUsers);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');
  }

  try {
    const user = await userService.getUsersById(id);

    if (!user) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Bad Request: Missing required parameter');

    return;
  }

  try {
    const user = await userService.createUser(name);

    if (!user) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    res.statusCode = 201;
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.status(400).send('Bad Request: Missing required parameter');
  }

  try {
    const user = await userService.getUsersById(id);

    if (!user) {
      res.status(404).send('Not Found: The specified entity does not exist');
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);
    }

    const updatedUser = await userService.updateUser({
      id, name,
    });

    res.send(updatedUser);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.status(400).send('Bad Request: Missing required parameter');
  }

  try {
    const user = await userService.getUsersById(id);

    if (!user) {
      res.status(404).send('Not Found: The specified entity does not exist');

      return;
    }

    await userService.removeUser(id);

    res.sendStatus(204);
  } catch (error) {
    console.log(error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
