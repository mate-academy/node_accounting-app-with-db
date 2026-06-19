const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  return res.status(200).json(users);
};

const getById = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(user);
};

const create = async (req, res) => {
  const userName = req.body.name;

  if (!userName) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = await usersService.create(userName);

  res.status(201).json(user);
};

const deleteById = async (req, res) => {
  const id = req.params.id;
  const user = await usersService.deleteById(id);

  if (user === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(204).send();
};

const update = async (req, res) => {
  const id = req.params.id;
  const userName = req.body.name;

  if (!id || !userName) {
    res.status(400).send('Bad Request');

    return;
  }

  const user = await usersService.update({ id, name: userName });

  if (user === null) {
    res.status(404).send('Not Found');

    return;
  }

  res.status(200).json(user);
};

module.exports = {
  getAll,
  getById,
  create,
  deleteById,
  update,
};
