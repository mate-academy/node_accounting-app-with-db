const userService = require('../services/users.service');

const create = async (request, response) => {
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  const [[result]] = await userService.create(name);

  response.status(201).send(result);
};

const getAll = async (request, response) => {
  const [result] = await userService.getAll();

  response.status(200).send(result);
};

const get = async (request, response) => {
  const { id } = request.params;

  const [[result]] = await userService.get(id);

  if (!result) {
    response.sendStatus(404);

    return;
  }

  response.status(200).send(result);
};

const patch = async (request, response) => {
  const { id } = request.params;
  const { name } = request.body;

  if (!name) {
    response.sendStatus(400);

    return;
  }

  const [[result]] = await userService.patch(id, name);

  if (!result) {
    response.sendStatus(404);

    return;
  }

  response.status(200).send(result);
};

const remove = async (request, response) => {
  const { id } = request.params;

  const [, { rowCount }] = await userService.remove(id);

  if (!rowCount) {
    response.sendStatus(404);

    return;
  }

  response.sendStatus(204);
};

module.exports = {
  create,
  getAll,
  get,
  patch,
  remove,
};
