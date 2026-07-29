const usersService = require('../services/users.service');

class UserController {
  static async getAll(req, res) {
    const users = await usersService.getAll();

    res.json(users.map((user) => usersService.normalize(user)));
  }

  static async getById(req, res) {
    const userId = Number(req.params.id);

    if (!(userId >= 0)) {
      return res.sendStatus(400);
    }

    const user = await usersService.getById(userId);

    if (user) {
      res.json(usersService.normalize(user));
    } else {
      res.sendStatus(404);
    }
  }

  static async create(req, res) {
    const { name } = req.body;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = usersService.normalize(await usersService.create(name));

    res.status(201).json(user);
  }

  static async deleteById(req, res) {
    const affectedRows = await usersService.deleteById(Number(req.params.id));

    if (affectedRows) {
      res.sendStatus(204);
    } else {
      res.sendStatus(404);
    }
  }

  static async update(req, res) {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!(id >= 0) || !name) {
      return res.sendStatus(400);
    }

    const user = usersService.normalize(
      await usersService.update({ id, name }),
    );

    if (user) {
      res.send(user);
    } else {
      res.sendStatus(404);
    }
  }
}
module.exports = UserController;
