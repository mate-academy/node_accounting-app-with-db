'use strict';

const userService = require('../services/user.service');

const get = async(request, response) => {
  const users = await userService.getUsers();

  response.send(users);
};

const getOne = async(request, response) => {
  const { id } = request.params;

  const user = await userService.getUserById(parseInt(id));

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
};

const create = async(request, response) => {
  if (!request.body || !request.body.name) {
    return response.sendStatus(400);
  }

  const user = await userService.createUser(request.body);

  response.status(201);
  response.send(user);
};

const update = async(request, response) => {
  const { id } = request.params;

  if (!request.body.name) {
    return response.sendStatus(400);
  }

  const user = await userService.updateUserById(parseInt(id), request.body);

  if (!user) {
    return response.sendStatus(404);
  }

  response.send(user);
};

const remove = async(request, response) => {
  const { id } = request.params;

  const deletedUser = await userService.deleteUserById(parseInt(id));

  if (!deletedUser) {
    return response.sendStatus(404);
  }

  response.sendStatus(204);
};

module.exports = {
  get,
  create,
  getOne,
  remove,
  update,
};
