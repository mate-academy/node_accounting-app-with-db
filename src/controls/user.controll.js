import * as userService from '../services/user.service.js';

export const getUsers = async (req, res) => {
  res.send(await userService.getAllUsers());
};

export const getByIdUsers = async (req, res) => {
  const { id } = req.params;
  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }
  res.send(user);
};

export const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!(await userService.getUserById(id))) {
    res.sendStatus(404);

    return;
  }

  await userService.deleteUser(id);

  res.sendStatus(204);
};

export const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.createUser(name);

  res.status(201).send(user);
};

export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getUserById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  await userService.updatedUser({ id, name });

  const updatedUser = await userService.getUserById(id);

  res.send(updatedUser);
};
