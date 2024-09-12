const { USER_NOT_FOUND, NAME_REQUIRED } = require('../const/errors');
const {
  getAll,
  getById,
  create,
  update,
  remove,
  normalize,
} = require('../services/users.service');

const getUsers = async (req, res) => {
  const users = await getAll();

  const normalizedUsers = users.map((user) => normalize(user));

  res.status(200);
  res.send(normalizedUsers);
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await getById(id);

  if (!user) {
    res.status(404);

    res.send(USER_NOT_FOUND);
  }

  res.status(200);
  res.send(normalize(user));
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    res.send(NAME_REQUIRED);
  }

  const newUser = await create(name);

  res.status(201);
  res.send(normalize(newUser));
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!name) {
    res.status(400);
    res.send(NAME_REQUIRED);
  }

  const user = await getById(id);

  if (!user) {
    res.status(404);
    res.send(USER_NOT_FOUND);
  }

  await update(id, name);

  const updatedUser = await getById(id);

  res.status(200);
  res.send(normalize(updatedUser));
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  const user = await getById(id);

  if (!user) {
    res.status(404);
    res.send(USER_NOT_FOUND);
  }

  await remove(id);

  res.status(204);
  res.send(normalize(user));
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  removeUser,
};
