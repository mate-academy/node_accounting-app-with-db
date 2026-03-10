const { usersService } = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map((user) => usersService.normalize(user)));
};

const getOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  res.json(usersService.normalize(user));
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    return res.sendStatus(400);
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const deleteOne = async (req, res) => {
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  await usersService.deleteById(req.params.id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const user = await usersService.getById(req.params.id);

  if (!user) {
    return res.sendStatus(404);
  }

  const updatedUser = await usersService.update({
    id: req.params.id,
    name,
  });

  res.json(updatedUser); // Тест чекає на об'єкт користувача тут
};

const usersController = {
  getAll,
  getOne,
  create,
  deleteOne,
  update,
};

module.exports = {
  usersController,
};
