const { getAll, add, get, update, remove } = require("../services/users.service");

const getUsers = async (req, res) => {
  const users = await getAll();
  res.status(200).json(users);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).send('Bad request');
  }

  const newUser = await add(name);

  res.status(201).send(newUser);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const user = await get(+id);

  if (!user) {
    return res.status(404).send('Not found');
  }

  res.status(200).send(user);
};

const removeUser = async (req, res) => {
  const { id } = req.params;

  if (!id || isNaN(+id)) {
    return res.status(400).send('Bad request');
  }

  const deletedNumber = await remove(+id);

  if (deletedNumber === 0) {
    return res.status(404).send('Not Found');
  }

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || isNaN(+id) || typeof name !== 'string' || name.trim() === '') {
    return res.status(400).send('Bad request');
  }

  const user = await update(+id, name);

  if (!user) {
    return res.status(404).send('Not found');
  }

  res.status(200).json(user);
};

module.exports = {
  getUsers,
  createUser,
  getUser,
  updateUser,
  removeUser,
};
