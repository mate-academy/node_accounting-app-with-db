const { usersService } = require('../service/user.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200);
  res.json(users);
};

const get = async (req, res) => {
  const userId = Number(req.params.id);

  if (isNaN(userId)) {
    return res.sendStatus(400);
  }

  const thisUser = await usersService.get(userId);

  if (!thisUser) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(thisUser);
};

const create = async (req, res) => {
  const newUserName = req.body.name;

  if (!newUserName) {
    return res.sendStatus(400);
  }

  const addedUser = await usersService.create(newUserName);

  res.status(201).json(addedUser);
};

const remove = async (req, res) => {
  const thisUserId = Number(req.params.id);

  if (isNaN(thisUserId)) {
    return res.sendStatus(400);
  }

  const removedUser = await usersService.deleteById(thisUserId);

  if (!removedUser) {
    return res.sendStatus(404);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const name = req.body.name;
  const id = Number(req.params.id);

  if (isNaN(id) || !name) {
    return res.sendStatus(400);
  }

  const updatedUser = await usersService.update({ id, name });

  if (!updatedUser) {
    return res.sendStatus(404);
  }

  res.status(200);
  res.json(updatedUser);
};

module.exports.usersController = {
  getAll,
  get,
  create,
  remove,
  update,
};
