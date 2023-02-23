'use strict';

const { userService } = require('../services/users.service');

const getAll = async(_, response) => {
  const users = await userService.getAll();

  response.send(users);
};

const getOne = async(request, response) => {
  const userId = Number(request.params.userId);

  if (typeof userId !== 'number') {
    response.sendStatus(400);

    return;
  }

  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  response.send(foundUser);
};

const create = async(request, response) => {
  const { name } = request.body;

  if (!name || typeof name !== 'string') {
    response.sendStatus(400);

    return;
  }

  const newUser = await userService.create(name);

  response.statusCode = 201;
  response.send(newUser);
};

const remove = async(request, response) => {
  const userId = Number(request.params.userId);
  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  await userService.remove(userId);

  response.sendStatus(204);
};

const update = async(request, response) => {
  const userId = Number(request.params.userId);
  const foundUser = await userService.findById(userId);

  if (!foundUser) {
    response.sendStatus(404);

    return;
  }

  const { name } = request.body;

  if (typeof name !== 'string') {
    response.sendStatus(400);

    return;
  }

  const updatedUser = await userService.update({
    id: userId,
    name,
  });

  response.send(updatedUser);
};

module.exports.userController = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
