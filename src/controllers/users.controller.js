const usersService = require('../services/users.service');

const getAll = async (req, res) => {
  try {
    const users = await usersService.getAll();

    res.json(users);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const getOne = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('Id is required');

    return;
  }

  const user = await usersService.getById(id);

  if (user) {
    res.json(user);

    return;
  }

  res.status(404).end('User not found');
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) {
    res.status(400).end('Name is required');

    return;
  }

  try {
    const user = await usersService.create(name);

    res.status(201).json(user);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const remove = async (req, res) => {
  const id = req.params.id;

  if (!id) {
    res.status(400).end('Id is required');

    return;
  }

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.status(404).end('User not found');

      return;
    }

    await usersService.remove(id);

    res.status(204).end('The deletion was successful');
  } catch (error) {
    res.status(500).end('Server error');
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const name = req.body.name;

  if (!id || !name) {
    res.status(400).end('Id and name is required');

    return;
  }

  try {
    const user = await usersService.getById(id);

    if (!user) {
      res.status(404).end('User not found');

      return;
    }

    await usersService.update(id, name);

    const updatedUser = await usersService.getById(id);

    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).end('Server error');
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
