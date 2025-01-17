const { usersService } = require('./../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.status(200).json(users);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.create(name);

  res.status(201).json(user);
};

const getOne = async (req, res) => {
  const { userId } = req.params;
  const numberId = +userId;
  const user = await usersService.getById(numberId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.status(200).json(user);
};

const deleteOne = async (req, res) => {
  const { userId } = req.params;
  const numberId = +userId;
  const user = await usersService.getById(numberId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await usersService.deleteById(numberId);
  res.sendStatus(204);
};

const update = async (req, res) => {
  const { userId } = req.params;
  const { name } = req.body;
  const numberId = +userId;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const user = await usersService.getById(numberId);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  try {
    const updatedUser = await usersService.update({ id: numberId, name });

    res.status(200).json(updatedUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const usersController = {
  getAll,
  create,
  getOne,
  deleteOne,
  update,
};

module.exports = {
  usersController,
};
