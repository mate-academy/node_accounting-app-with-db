'use strict';

const { userError } = require('../errorsHandlers/user');
const { error400, error404 } = require('../errorsHandlers/general');
const { usersService } = require('../services/users');

class UsersController {
  async postUser(req, res) {
    const { name } = req.body;

    const error = userError(name);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json({ error });

      return;
    }

    const user = await usersService.createUser(name);

    res.statusCode = 201;
    res.json(user);
  }

  async getUsers(req, res) {
    const data = await usersService.getAll();

    res.statusCode = 200;
    res.json(data);
  };

  async getUser(req, res) {
    const { userId } = req.params;

    if (isNaN(+userId)) {
      res.statusCode = 400;
      res.json({ error: error400 });

      return;
    }

    const user = await usersService.getOne(+userId);

    if (!user) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(user);
  };

  async removeUser(req, res) {
    const { userId } = req.params;

    const isDeleted = await usersService.removeOne(+userId);

    if (!isDeleted) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.sendStatus(204);
  };

  async patchUser(req, res) {
    const { userId } = req.params;
    const { name } = req.body;

    const error = userError(name, +userId);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json({ error });

      return;
    }

    await usersService.modifyUser(+userId, name);

    const user = await usersService.getOne(+userId);

    if (!user) {
      res.statusCode = 404;
      res.json({ error: error404 });

      return;
    }

    res.statusCode = 200;
    res.json(user);
  };
}

const usersController = new UsersController();

module.exports = {
  usersController,
};
