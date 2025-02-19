const { userService } = require('../services/user.service');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getOne = async (req, res) => {
  const user = await userService.getById(+req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.json(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  const newUser = await userService.create(name);

  return res.status(201).json(newUser);
};

const remove = async (req, res) => {
  const userToRemove = await userService.getById(+req.params.id);

  if (!userToRemove) {
    return res.status(404).send('User not exist');
  }

  await userService.removeById(+req.params.id);

  return res.sendStatus(204);
};

const update = async (req, res) => {
  const userToUpdate = await userService.getById(+req.params.id);

  if (!userToUpdate) {
    return res.sendStatus(404);
  }

  const updatedUser = {
    id: +req.params.id,
    name: req.body.name,
  };

  const response = await userService.updateById(updatedUser);

  return res.json(response);
};

const userController = {
  getAll,
  getOne,
  create,
  remove,
  update,
};

module.exports = {
  userController,
};
