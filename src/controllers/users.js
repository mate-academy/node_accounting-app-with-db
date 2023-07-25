'use strict';

const { usersService } = require('../services/users');

class UserController {
  async getUsers(req, res) {
    const users = await usersService.getUsers();

    res.status(200).json(users);
  };

  async addUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await usersService.addUser(name);

    res.status(201).json(user);
  };

  async getUserById(req, res) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'Invalid ID' });

      return;
    }

    const user = await usersService.getUserById(userId);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(200).json(user);
  };

  async deleteUser(req, res) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'Invalid ID' });

      return;
    }

    const isDeleted = await usersService.deleteUser(userId);

    if (!isDeleted) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(204).json({ message: 'User deleted' });
  };

  async updateUser(req, res) {
    const { userId } = req.params;

    if (!userId) {
      res.status(400).json({ message: 'Invalid ID' });

      return;
    }

    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await usersService.updateUser(userId, name);

    if (!user) {
      res.status(404).json({ message: 'User not found' });

      return;
    }

    res.status(200).json(user);
  };
}

module.exports = { usersController: new UserController() };
