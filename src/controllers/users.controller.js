const userService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    res.send(await userService.getAll());
  } catch (error) {
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

const createUser = async (req, res) => {
  if (!req.body.name) {
    res.sendStatus(400);

    return;
  }

  try {
    res.statusCode = 201;
    res.send(await userService.createUser(req.body));
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getOne(id))) {
    res.sendStatus(404);

    return;
  }

  try {
    res.send(await userService.updateUser(id, req.body));
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  try {
    if (!(await userService.getOne(id))) {
      res.sendStatus(404);

      return;
    }

    await userService.removeUser(id);
    res.sendStatus(204);
  } catch {
    res.statusCode = 500;
    res.send('Something went wrong');
  }
};

module.exports = {
  getAll,
  getOne,
  createUser,
  updateUser,
  removeUser,
};
