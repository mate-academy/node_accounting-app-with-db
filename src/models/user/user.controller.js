
import * as userService from './user.service.js';

const getAll = async(req, res) => {
  const users = await userService.getAll();

  res.status(200).send(users);
};

const getById = async(req, res) => {
  const id = +req.params.id;

  const user = await userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  res.send(user);
};

const remove = async(req, res) => {
  const id = +req.params.id;

  const user = await userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.remove(id);

  res.sendStatus(204);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userService.create({ name });

  res.status(201).send(newUser);
};

const update = async(req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.getOne(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  await userService.update({
    id, name,
  });

  const updatedUser = await userService.getOne(id);

  res.status(200).send(updatedUser);
};

export {
  getAll,
  getById,
  remove,
  create,
  update,
};
