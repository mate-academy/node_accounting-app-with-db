const { userService } = require('../services/user.service.js');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  return res.json(users);
};

const getById = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (!id) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  return res.status(200).json(user);
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await userService.create({ name });

  return res.status(201).json(user);
};

const update = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  if (!id) {
    return res.sendStatus(400);
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.sendStatus(404);
  }

  const { name } = req.body;
  const updatedUser = await userService.update({ id, name });

  return res.json(updatedUser);
};

const deleteOne = async (req, res) => {
  const id = Number.parseInt(req.params.id);

  const deletedUser = await userService.deleteById(id);

  if (!deletedUser) {
    return res.sendStatus(404);
  }

  return res.sendStatus(204);
};

const userController = {
  getAll,
  getById,
  create,
  update,
  deleteOne,
};

module.exports = {
  userController,
};
