const userService = require('../services/user.service');

const getAll = async (req, res, next) => {
  const users = await userService.getAll();

  res.status(200).json(users);
};

const getById = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    if (!id) {
      res.sendStatus(400);

      return;
    }

    const user = await userService.getById(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.status(200).json(user);
  } catch (error) {
    res.sendStatus(404);
  }
};

const create = async (req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const createdUser = await userService.create(name);

  res.status(201).json(createdUser);
};

const update = async (req, res, next) => {
  try {
    const id = Number(req.params.id);
    const { name } = req.body;

    if (!name) {
      res.sendStatus(400);

      return;
    }

    const createdUser = await userService.update(id, { name });

    res.status(200).json(createdUser);
  } catch (error) {
    res.sendStatus(404);
  }
};

const remove = async (req, res, next) => {
  try {
    const id = Number(req.params.id);

    await userService.remove(id);

    res.sendStatus(204);
  } catch (error) {
    res.sendStatus(404);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
