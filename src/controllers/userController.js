const userService = require('../services/userService');

module.exports = {
  async getAll(_req, res) {
    const users = await userService.getAll();

    res.status(200).send(users);
  },
  async getOne(req, res) {
    const id = parseInt(req.params.id);

    const user = await userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).send(user);
  },
  async create(req, res) {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.create({ name });

    res.status(201).send(user);
  },
  async update(req, res) {
    const currentId = parseInt(req.params.id);

    const { name, id } = req.body;

    if (!name && !id) {
      res.sendStatus(400);

      return;
    }

    const foundUser = await userService.getById(currentId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    await userService.update({ currentId, id, name });

    const updatedUser = await userService.getById(id ?? currentId);

    res.status(200).send(updatedUser);
  },
  async remove(req, res) {
    const id = parseInt(req.params.id);

    const foundUser = await userService.getById(id);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    await userService.remove(id);

    res.sendStatus(204);
  },
};
