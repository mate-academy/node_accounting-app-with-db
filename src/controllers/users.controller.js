const { usersService } = require('../services/users.service');

class UsersController {
  getAllUsers = async (req, res) => {
    try {
      res.send(await usersService.getAll());
    } catch {
      res.status(500).send('Failed to get users');
    }
  };
  createUser = async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    try {
      res.status(201).send(await usersService.create(name));
    } catch {
      res.status(500).send('Failed to create user');
    }
  };
  getUser = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await usersService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.send(user);
    } catch (error) {
      res.status(500).send('Failed to get user');
    }
  };
  updateUser = async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const user = await usersService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      res.send(await usersService.update(id, name));
    } catch {
      res.status(500).send('Failed to update user');
    }
  };
  deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
      const user = await usersService.getById(id);

      if (!user) {
        res.sendStatus(404);

        return;
      }

      await usersService.delete(id);
      res.sendStatus(204);
    } catch {
      res.status(500).send('Failed to delete user');
    }
  };
}

const usersController = new UsersController();

module.exports = { usersController };
