'use strict';

const userService = require('./../services/user.service');

const userController = {
  get: async(req, res) => {
    const users = await userService.getAll();

    res.send(users.map(user => userService.normalize(user)));
  },

  getOne: async(req, res) => {
    const { id } = req.params;

    const user = await userService.getById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }
    res.send(userService.normalize(user));
  },

  post: async(req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.create(name);

    res.statusCode = 201;
    res.send(user);
  },

  patch: async(req, res) => {
    const { id } = req.params;

    const user = await userService.update(+id, req.body);

    if (!user[1]) {
      res.sendStatus(404);

      return;
    }

    res.send(userService.normalize(user[1][0]));
  },

  delete: async(req, res) => {
    const { id } = req.params;
    const user = await userService.getById(+id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await userService.delete(+id);
    res.send(userService.normalize(user));
  },
};

module.exports = userController;
