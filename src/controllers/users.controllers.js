const usersServiсe = require('../services/users.service');

const getAllUsers = async (req, res) => {
  res.status(200).send(await usersServiсe.getAllUsers());
};

const getOneUser = async (req, res) => {
  const { id } = req.params;

  if (typeof +id !== 'number') {
    res.status(400).send('Write correct data');

    return;
  }

  const user = await usersServiсe.getOne(+id);

  if (!user) {
    res.status(404).send('Not found');

    return;
  }

  res.status(200).send(user);
};

const createUser = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).send('Write correct data');

    return;
  }

  const user = await usersServiсe.create(name);

  res.status(201).send(user);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!(await usersServiсe.getOne(+id))) {
    res.status(404).send('Not found');

    return;
  }

  await usersServiсe.deleteUser(+id);

  res.sendStatus(204);
};

const updateUser = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;

  if ((await usersServiсe.getOne(+id)) === null) {
    res.status(404).send('Not found');

    return;
  }

  if (typeof name !== 'string') {
    res.status(400).send('Write correct data');

    return;
  }

  const updatedUser = await usersServiсe.updateUser(Number(id), name);

  res.status(200).send(updatedUser);
};

module.exports = {
  getAllUsers,
  getOneUser,
  createUser,
  deleteUser,
  updateUser,
};
