import * as userService from '../services/user.service.js';

export const get = async(req, res) => {
  try {
    const result = await userService.getAll();

    res.statusCode = 200;
    res.send(result);
  } catch (error) {
    res.sendStatus(500);
  }
};

export const getOne = async(req, res) => {
  const { id } = req.params;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

export const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  res.statusCode = 201;
  res.send(newUser);
};

export const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name || !id) {
    res.sendStatus(400);

    return;
  }

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  const updatedUser = await userService.update(id, name);

  res.send(updatedUser);
};

export const remove = async(req, res) => {
  const { id } = req.params;

  if (!(await userService.getById(id))) {
    res.sendStatus(404);

    return;
  }

  userService.remove(id);
  res.sendStatus(204);
};
