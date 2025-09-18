const UserService = require('../services/user.service');

module.exports = {
  getAll: async (_, res) => {
    res.send(await UserService.getAll());
  },

  get: async (req, res) => {
    const { id } = req.params;
    const user = await UserService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  },

  create: async (req, res) => {
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const newUser = await UserService.create(name);

    res.status(201).send(newUser);
  },

  edit: async (req, res) => {
    const { id } = req.params;
    const { name } = req.body;

    try {
      const user = await UserService.getById(+id);

      if (!user) {
        return res.sendStatus(404);
      }

      if (name !== undefined) {
        await UserService.edit(+id, name);
        user.name = name;
      }

      return res.send(user);
    } catch (err) {
      return res.status(400);
    }
  },

  remove: async (req, res) => {
    const { id } = req.params;

    try {
      await UserService.remove(+id);
      res.sendStatus(204);
    } catch {
      res.sendStatus(404);
    }

    res.end();
  },
};
