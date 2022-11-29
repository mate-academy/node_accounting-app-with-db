'use strict';

const {
  checkUserName, checkUserData, checkUserId,
} = require('../utility/dataCheck/user');
const { entityNotExist } = require('../utility/dataCheck/errorMessages');
const { usersService } = require('../services/users');

class UsersController {
  async postUser(req, res) {
    const { name } = req.body;

    const error = checkUserName(name);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

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

    const error = checkUserId(userId);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    const user = await usersService.getOne(+userId);

    if (!user) {
      res.statusCode = 404;
      res.json({ error: entityNotExist });

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
      res.json({ error: entityNotExist });

      return;
    }

    res.sendStatus(204);
  };

  async patchUser(req, res) {
    const { userId } = req.params;
    const { name } = req.body;

    const error = checkUserData(name, +userId);

    if (error.errors.length !== 0) {
      res.status(400);
      res.json(error);

      return;
    }

    await usersService.modifyUser(+userId, name);

    const user = await usersService.getOne(+userId);

    if (!user) {
      res.statusCode = 404;
      res.json({ error: entityNotExist });

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
