'use strict';

const userServices = require('../services/users');

const getAll = async(req, res) => {
  try {
    const users = await userServices.getAll();

    res.send(users.map(userServices.normalize));
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    const user = await userServices.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(userServices.normalize(user));
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const { name } = req.body;

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    const newUser = await userServices.add(name);

    res.send(userServices.normalize(newUser));
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name || typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    await userServices.update(id, name);

    const updatedUser = await userServices.getOne(id);

    if (!updatedUser) {
      res.sendStatus(400);

      return;
    }

    res.send(updatedUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(404);

      return;
    }

    await userServices.remove(id);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  update,
  remove,
};
