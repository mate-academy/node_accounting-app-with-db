'use strict';

const { usersService } = require('../services/users');

const usersControllers = {
  getAll: async(req, res) => {
    const users = await usersService.getAll();

    res.send(
      users.map(usersService.normalize)
    );
  },
  getOne: async(req, res) => {
    const { userId } = req.params;

    const findUserById = await usersService.getById(userId);

    if (!findUserById) {
      res.sendStatus(404);

      return;
    }

    res.send(usersService.normalize(findUserById));
  },
  create: async(req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await usersService.create(name);

    res.statusCode = 201;
    res.send(usersService.normalize(newUser));
  },
  remove: async(req, res) => {
    const { userId } = req.params;
    const findUserById = await usersService.getById(userId);

    if (!findUserById) {
      res.sendStatus(404);

      return;
    }

    await usersService.remove(userId);
    res.sendStatus(204);
  },
  update: async(req, res) => {
    const { userId } = req.params;
    const { name } = req.body;

    const foundUser = await usersService.getById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    if (typeof name !== 'string') {
      res.sendStatus(422);

      return;
    }

    await usersService.update(userId, name);
    res.send(usersService.normalize(foundUser));
  },
};

module.exports = {
  usersControllers,
};
