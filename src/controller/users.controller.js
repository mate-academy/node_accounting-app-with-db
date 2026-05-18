const usersService = require('../models/User.model');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.send(users);
  } catch (error) {
    res.sendStatus(422);
  }
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  try {
    const user = await usersService.getOne(+id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  } catch (error) {
    res.sendStatus(404);
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (isNaN(+id)) {
    return res.sendStatus(400);
  }

  try {
    const deleteCount = await usersService.remove(+id);

    if (deleteCount === 0) {
      return res.sendStatus(404);
    }
    res.sendStatus(204);
  } catch (error) {
    return res.sendStatus(400);
  }
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.sendStatus(400);
  }

  try {
    const newUser = await usersService.create(name);

    res.status(201).send(newUser);
  } catch (error) {
    res.sendStatus(400);
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (isNaN(+id) || !name) {
    return res.sendStatus(400);
  }

  try {
    const [isUpdated, updatedUser] = await usersService.update(name, id);

    if (isUpdated === 0) {
      return res.sendStatus(404);
    }

    res.send(updatedUser[0]);
  } catch (error) {
    return res.sendStatus(400);
  }
};

module.exports = {
  getAll,
  getOne,
  remove,
  create,
  update,
};
