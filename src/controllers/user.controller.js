const { userService } = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll(req.query);

  res.status(200).json(users);
};

const getById = async (req, res) => {
  const user = await userService.getById(parseInt(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.status(200).json(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.add({ name });

  res.status(201).json(user);
};

const remove = async (req, res) => {
  const userId = parseInt(req.params.id);

  const user = await userService.getById(userId);

  if (!user) {
    return res.sendStatus(404);
  }

  await userService.remove(userId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const userId = parseInt(req.params.id);
  const user = await userService.getById(userId);
  const { name } = req.body;

  if (!user) {
    return res.sendStatus(404);
  }

  if (!name) {
    return res.sendStatus(400);
  }

  const updated = await userService.update({
    id: userId,
    name,
  });

  res.json(updated);
};

const userController = {
  getAll,
  getById,
  add,
  remove,
  update,
};

module.exports = {
  userController,
};
