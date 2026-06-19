/* eslint-disable */
const userService = require('../services/user.service.js');

async function get(req, res) {
  const users = await userService.getAll();
  return res.send(users.map((user) => userService.normalize(user)));
}

async function getOne(req, res) {
  const { id } = req.params;

  const person = await userService.getById(id);

  if (!person) {
    res.sendStatus(404);

    return;
  }

  res.send(userService.normalize(person));
}

async function create(req, res) {
  const { name } = req.body;
  if (!name) {
    res.sendStatus(400);

    return;
  }

  const user = await userService.create(name);

  res.statusCode = 201;
  res.send(userService.normalize(user));
}

async function update(req, res) {
  const { id } = req.params;
  const { name } = req.body;
  const user = await userService.getById(id);

  if (!user) {
    res.sendStatus(404);

    return;
  }

  if (typeof name !== 'string') {
    res.sendStatus(422);

    return;
  }

  // res.sendStatus(200);
  const updatedUser = await userService.update({ id, name });

  res.json(updatedUser);
}

async function remove(req, res) {
  const { id } = req.params;

  if (!await userService.getById(id)) {
    return res.sendStatus(404);
  }

  await userService.remove(id);
  res.sendStatus(204);
}

module.exports = {
  get,
  getOne,
  create,
  update,
  remove,
};
