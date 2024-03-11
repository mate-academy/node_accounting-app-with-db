'use strict';

const userService = require('../services/user.service');

const get = async(req, res) => {
  try {
    const users = await userService.getAll();

    res.send(users);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const getOne = async(req, res) => {
  const id = req.params.id;

  try {
    const user = await userService.getById(id);

    if (!user) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    res.send(user);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const create = async(req, res) => {
  try {
    const newUser = await userService.create(req.body);

    res.status(201).send(newUser);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const remove = async(req, res) => {
  const id = req.params.id;

  try {
    const count = await userService.remove(id);

    if (!count) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    res.sendStatus(204);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

const update = async(req, res) => {
  const id = req.params.id;

  try {
    const [count] = await userService.update(id, req.body);

    if (!count) {
      res.status(404).send({ error: 'Not Found' });

      return;
    }

    const updatedUser = await userService.getById(id);

    res.status(200).send(updatedUser);
  } catch (error) {
    res.status(500).send({ error: `Internal Server Error! ${error.message}` });
  }
};

module.exports = {
  get, getOne, create, remove, update,
};
