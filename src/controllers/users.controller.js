const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const users = await userService.getAll();

    res.send(users);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const create = async (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await userService.create(req.body);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const update = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await userService.update(id, req.body);

    res.send(updatedUser);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const remove = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.getOne(id);

    if (!user) {
      res.sendStatus(404);

      return;
    }

    await userService.remove(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
