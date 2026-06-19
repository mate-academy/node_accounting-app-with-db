const { userService } = require('../services/user.service');

const getAll = async (_, res) => {
  const users = await userService.getAll();

  res.set('Content-Type', 'application/json');
  res.status(200).json(users);
};

const getById = async (req, res) => {
  const user = await userService.getById(parseInt(req.params.id));

  if (!user) {
    return res.sendStatus(404);
  }

  res.set('Content-Type', 'application/json');
  res.json(user);
};

const add = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.add({ name });

  res.set('Content-Type', 'application/json');
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

  if (!user) {
    return res.sendStatus(404);
  }

  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const updatedUser = await userService.update({
    id: userId,
    name,
  });

  res.set('Content-type', 'application/json');
  res.json(updatedUser);
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
