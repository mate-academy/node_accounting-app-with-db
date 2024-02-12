'use strict';

const { usersService } = require('../services/users.service');

class UsersController {
  async get(req, res) {
    try {
      res.status(200).json(await usersService.getUsers());
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async create(req, res) {
    const { name } = req.body;

    try {
      res.status(201).json(await usersService.createUser(name));
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async getOne(req, res) {
    const { id } = req.params;

    try {
      const foundUser = await usersService.getUserById(id);

      if (!foundUser) {
        return res.sendStatus(404);
      }

      res.status(200).json(foundUser);
    } catch (error) {
      res.sendStatus(500).send(error);
    }
  };

  async remove(req, res) {
    const { id } = req.params;

    try {
      if (!await usersService.getUserById(id)) {
        return res.sendStatus(404);
      }

      await usersService.removeUserById(id);

      res.sendStatus(204);
    } catch (error) {
      return res.sendStatus(500).send(error);
    }
  };

  async update(req, res) {
    const { name } = req.body;
    const { id } = req.params;

    try {
      const foundUser = await usersService.getUserById(id);

      if (!foundUser) {
        return res.sendStatus(404);
      }

      const updatedUser = await usersService.updateUser(
        usersService.normalize(foundUser), { name },
      );

      res.status(200).json(updatedUser);
    } catch (error) {
      return res.sendStatus(500).send(error);
    }
  };
};

const usersController = new UsersController();

module.exports = {
  usersController,
};
