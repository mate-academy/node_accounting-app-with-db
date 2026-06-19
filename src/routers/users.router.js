const {
  getAll,
  getById,
  create,
  update,
  remove,
} = require('../services/users.service.js');

const getAllUsers = async (req, res) => {
  const users = await getAll();

  res.send(users);
};

const getUsersById = async (req, res) => {
  const { id } = req.params;

  const idNum = Number(id);

  const user = await getById(idNum);

  if (!user) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400).send({ message: 'Invalid field' });

    return;
  }

  if (name === undefined) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const user = await create({ name });

  res.status(201).send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  const idNum = Number(id);

  const user = await remove(idNum);

  if (!user) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.status(204).send();
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const idNum = Number(id);

  if (typeof name !== 'string') {
    res.status(400).send({ message: 'Invalid field' });

    return;
  }

  if (name === undefined) {
    res.status(400).send({ message: 'Missing required field' });

    return;
  }

  const user = await update({ id: idNum, name });

  if (!user) {
    res.status(404).send({ message: 'Not found' });

    return;
  }

  res.send(user);
};

module.exports = {
  getAllUsers,
  getUsersById,
  createUser,
  deleteUser,
  updateUser,
};
