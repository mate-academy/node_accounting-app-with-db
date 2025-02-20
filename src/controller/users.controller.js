const { userService } = require('../services/users.service');

const userController = {
  getAll: async (req, res) => {
    const users = await userService.getAll();

    res.json(users);
  },
  getOne: async (req, res) => {
    const user = await userService.getById(+req.params.id);

    if (!user) {
      return res.sendStatus(404);
    }

    return res.json(user);
  },
  create: async (req, res) => {
    const name = req.body.name;

    if (!name) {
      return res.sendStatus(400);
    }

    const user = await userService.create(name);

    res.status(201).json(user);
  },

  remove: async (req, res) => {
    const userToRemove = await userService.getById(+req.params.id);

    if (!userToRemove) {
      return res.sendStatus(404);
    }

    await userService.removeById(+req.params.id);

    res.sendStatus(204);
  },
  update: async (req, res) => {
    const id = +req.params.id;
    const { name } = req.body;
    const updatedUser = await userService.updateById({ id, name });

    if (!updatedUser) {
      return res.sendStatus(404);
    }

    return res.json(updatedUser);
  },
};

module.exports = {
  userController,
};
