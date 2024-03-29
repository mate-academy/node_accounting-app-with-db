const { validateUUID } = require('../helpers/validators');
const { User, ...userServise } = require('../models/User.model');

const getAll = async (req, res) => {
  const users = await userServise.get();

  if (!users) {
    res.status(404);

    return;
  }

  res.send(users);
};

const getById = async (req, res) => {
  const { id } = req.params;

  if (!validateUUID(id)) {
    res.status(404).send('Invalid UUID format');

    return;
  }

  const user = await userServise.getOne(id);

  if (!user) {
    res.status(404).send('User not found');

    return;
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  const result = await userServise.create({ name });

  if (!result) {
    res.sendStatus(501);

    return;
  }

  res.statusCode = 201;
  res.send(result);
};

const update = async (req, res) => {
  const { id } = req.params;
  const body = req.body;

  if (!validateUUID(id)) {
    res.status(400).send('Invalid UUID format');

    return;
  }

  if (
    !body ||
    !body.name ||
    body.name.length === 0 ||
    typeof body.name !== 'string'
  ) {
    res.sendStatus(422);

    return;
  }

  const result = await userServise.update(id, body);

  if (!result) {
    res.status(404).send('User not found');

    return;
  }

  const updatedUser = await userServise.getOne(id);

  res.send(updatedUser);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!validateUUID(id)) {
    res.status(404).send('Invalid UUID format');

    return;
  }

  const result = await userServise.remove(id);

  if (!result) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
