'use strict';

const userServices = require('../services/userServices.js');

const getAll = async(_req, res) => {
  try {
    const users = await userServices.getAll();

    res.send(users.map(user => userServices.normalize(user)));
  } catch (error) {
    res.sendStatus(500);
  }
};

const add = async(req, res) => {
  const { name } = req.body;

  try {
    const newUser = await userServices.createUser(name);

    res.status(201).send(userServices.normalize(newUser));
  } catch (error) {
    res.sendStatus(500);
  }
};

const getCurrentUser = async(req, res) => {
  const { userId } = req.params;

  try {
    const foundUser = await userServices.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(userServices.normalize(foundUser));
  } catch (error) {
    res.sendStatus(500);
  }
};

const remove = async(req, res) => {
  const { userId } = req.params;

  try {
    await userServices.removeUser(userId);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(500);
  }
};

const update = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  try {
    await userServices.updateUser(userId, name);

    const updateUser = await userServices.getUserById(userId);

    res.send(userServices.normalize(updateUser));
  } catch (error) {
    res.sendStatus(500);
  }
};

module.exports = {
  getAll,
  add,
  getCurrentUser,
  remove,
  update,
};
