const userService = require('../services/userService.js');

const getUsers = async (req, res) => {
  res.send(await userService.getAllUsers());
};

const getUser = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.status(200);
  res.json(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.createUser(name);

  res.status(201).json(user);
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  const { name } = req.body;
  const updatedUser = await userService.patchUser({ id, name });

  if (!updatedUser) {
    res.sendStatus(404);

    return;
  }
  res.status(200).json(updatedUser);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);
  res.sendStatus(204);
};

module.exports = {
  getUser,
  getUsers,
  createUser,
  updateUser,
  removeUser,
};
