const userService = require('../services/user.service');

const get = async (req, res) => {
  try {
    const data = await userService.getUsers();

    res.send(data);
  } catch {
    res.sendStatus(500);
  }
};

const getUser = async (req, res) => {
  let { id } = req.params;

  id = Number(id);

  try {
    const user = await userService.getUserById(id);

    if (user === null) {
      res.sendStatus(404);

      return;
    }

    res.send(user);
  } catch {
    res.sendStatus(500);
  }
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const user = await userService.createUser(name);

    res.statusCode = 201;
    res.send(user);
  } catch {
    res.sendStatus(400);
  }
};

const removeUser = async (req, res) => {
  let { id } = req.params;

  id = Number(id);

  if (!Number.isInteger(id)) {
    res.sendStatus(400);

    return;
  }

  try {
    const deletedUser = await userService.getUserById(id);

    if (!deletedUser) {
      res.sendStatus(404);

      return;
    }

    await userService.deleteUser(id);

    res.sendStatus(204);
  } catch {
    res.sendStatus(400);
  }
};

const updateUser = async (req, res) => {
  let { id } = req.params;
  const { name } = req.body;

  id = Number(id);

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  try {
    const isUser = await userService.getUserById(id);

    if (!isUser) {
      res.sendStatus(404);

      return;
    }

    const updatedUser = await userService.updateUser(id, name);

    res.send(updatedUser[1][0]);
  } catch {
    res.sendStatus(400);
  }
};

module.exports = {
  get,
  getUser,
  createUser,
  removeUser,
  updateUser,
};
