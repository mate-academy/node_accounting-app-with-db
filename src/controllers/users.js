'use strict';

const { usersService } = require('../services/users');

class UserController {
  async getUsers(req, res) {
    const users = await usersService.getUsers();

    if (!users) {
      res.status(500).json({ message: 'Failed to get users' });

      return;
    }

    const normalizedUsers = users.map(usersService.normalize);

    res.status(200).json(normalizedUsers);
  };

  async addUser(req, res) {
    const { name } = req.body;

    if (!name) {
      res.status(400).json({ message: 'Name is required' });

      return;
    }

    const user = await usersService.addUser(name);

    if (!user) {
      res.status(500).json({ message: 'Failed to add user' });

      return;
    }

    const normalizedUser = usersService.normalize(user);

    res.status(201).json(normalizedUser);
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

    const normalizedUser = usersService.normalize(user);

    res.status(200).json(normalizedUser);
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

    const normalizedUser = usersService.normalize(user);

    res.status(200).json(normalizedUser);
  };
}

const usersController = new UserController();

module.exports = { usersController };
