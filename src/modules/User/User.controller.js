/* eslint-disable no-console */
/* eslint-disable max-len */
'use strict';

const { UserService } = require('./user.service');

class UserController {
  static async getAll(req, res) {
    try {
      const users = await UserService.getAll();

      res.status(200).send(
        users.map(user => UserService.normalize(user))
      );
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  static async getById(req, res) {
    try {
      const { id } = req.params;
      const user = await UserService.getById(id);

      if (!user) {
        res.status(404).send(`ERROR: The user with id=${id} doesn't exist`);

        return;
      }

      res.status(200).send(UserService.normalize(user));
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  static async create(req, res) {
    try {
      const { name } = req.body;

      if (!name) {
        res.status(400).send('ERROR: Bad request. You must pass the username. Example:\n  { "name": "username" }');

        return;
      }

      const createdUser = await UserService.create(name);
      const normalizedUser = UserService.normalize(createdUser);

      return res.status(201).send(normalizedUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  static async update(req, res) {
    try {
      const { id } = req.params;
      const { name } = req.body;
      const user = await UserService.getById(id);

      if (!user) {
        res.status(404).send(`ERROR: The user with id=${id} doesn't exist`);

        return;
      }

      if (!name) {
        res.status(400).send('ERROR: Bad request. You must pass the username. Example:\n  { "name": "username" }');

        return;
      }

      await UserService.update(id, name);

      const updatedUser = await UserService.getById(id);
      const normalizedUser = UserService.normalize(updatedUser);

      res.status(200).send(normalizedUser);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }

  static async delete(req, res) {
    try {
      const { id } = req.params;
      const isDeleted = await UserService.delete(id);

      if (!isDeleted) {
        res.status(404).send(`ERROR: The user with id=${id} doesn't exist`);

        return;
      }

      res.sendStatus(204);
    } catch (error) {
      console.log(error.message);
      res.status(500).send('Internal Server Error');
    }
  }
};

module.exports = { UserController };
