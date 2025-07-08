const userService = require('../Services/userService');

const userController = {
  async getAll(req, res) {
    const users = await userService.getAll();

    res.json(users);
  },

  async getById(req, res) {
    if (!req.params.id) {
      return res.sendStatus(400);
    }

    const user = await userService.getById(Number(req.params.id));

    if (!user) {
      return res.sendStatus(404);
    }

    res.json(user);
  },

  async create(req, res) {
    if (!req.body.name) {
      return res.sendStatus(400);
    }

    const user = await userService.create(req.body.name);

    res.status(201).json(user);
  },

  async update(req, res) {
    if (!req.body.name || !req.params.id) {
      return res.sendStatus(400);
    }

    if (!(await userService.getById(Number(req.params.id)))) {
      return res.sendStatus(404);
    }
    await userService.update(Number(req.params.id), req.body.name);
    res.json(await userService.getById(Number(req.params.id)));
  },

  async delete(req, res) {
    if (!req.params.id) {
      return res.sendStatus(400);
    }

    if (!(await userService.getById(Number(req.params.id)))) {
      return res.sendStatus(404);
    }
    await userService.delete(Number(req.params.id));
    res.sendStatus(204);
  },
};

module.exports = userController;
