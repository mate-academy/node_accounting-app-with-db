'use strict';

const { userService } = require('../services/user.service');

const userController = {
  get: async(req, res) => {
    res.send(await userService.getAll());
  },

  getOne: async(req, res) => {
    const { id } = req.params;

    const user = await userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  addUser: async(req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await userService.addUser({ name });

    res.statusCode = 201;
    res.send(newUser);
  },

  remove: async(req, res) => {
    const { id } = req.params;

    if (!id) {
      res.sendStatus(204);

      return;
    }

    if (!await userService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    await userService.removeUser(id);
    res.sendStatus(204);
  },

  update: async(req, res) => {
    const { id } = req.params;
    const body = req.body;

    if (!await userService.getById(id)) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await userService.updateUser(body, id);

    res.send(updatedUser);
  },
};

module.exports = userController;
