'use strict';

const userService = require('../services/users');

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.send(
    users.map(userService.normalize)
  );
};

const getOne = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getById(id);

  if (!id) {
    res.sendStatus(400);

    return;
  }

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  res.send(
    userService.normalize(foundUser)
  );
};

const add = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  try {
    const newUser = await userService.create(name);

    res.statusCode = 201;

    res.send(
      userService.normalize(newUser)
    );
  } catch (err) {
    throw new Error(err);
  }
};

const remove = async(req, res) => {
  const { id } = req.params;
  const foundUser = await userService.getById(id);

  if (!foundUser) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);
  res.sendStatus(204);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  try {
    const foundUser = await userService.getById(id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    await userService.update(id, name);

    res.send(
      userService.normalize(foundUser)
    );
  } catch (err) {
    throw new Error(err);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
