'use strict';

const usersService = require('../services/users.js');

const getAll = async(req, res) => {
  try {
    const users = await usersService.getAll();

    res.send(
      users.map(usersService.normalize)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const getOne = async(req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    res.send(
      usersService.normalize(foundUser)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const add = async(req, res) => {
  try {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await usersService.create(name);

    res.statusCode = 201;

    res.send(
      usersService.normalize(newUser)
    );
  } catch (error) {
    res.sendStatus(400);
  }
};

const remove = async(req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    await usersService.remove(userId);
    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async(req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      res.sendStatus(400);

      return;
    }

    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    const { name } = req.body;

    if (!name && typeof name !== 'string') {
      res.sendStatus(400);

      return;
    }

    const updatedUser = await usersService.update({
      id: userId,
      name,
    });

    res.send(
      usersService.normalize(updatedUser)
    );
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getOne,
  add,
  remove,
  update,
};
