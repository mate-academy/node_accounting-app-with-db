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

  res.status(200);
  res.send(users.map((user) => normalize(user)));
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  const user = await getById(id);

  if (!user) {
    res.status(404);

    res.send('User not found');
  }

  res.status(200);
  res.send(normalize(user));
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400);

    res.send('Name is required');
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
    res.send('Name is required');
  }

  const user = await getById(id);

  if (!user) {
    res.status(404);
    res.send('User not found');
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
    res.send('User not found');
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
