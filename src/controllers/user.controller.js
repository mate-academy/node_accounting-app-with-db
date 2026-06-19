const usersService = require('../services/users.service');

const get = async (req, res) => {
  res.status(200).send(await usersService.getAll());
};

const getById = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'This id was not found' });
  }

  res.status(200).send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      message: 'Name is required',
    });
  }

  const user = await usersService.create(name);

  res.status(201).send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;

  if (!(await usersService.getById(id))) {
    return res.sendStatus(404);
  }

  const success = await usersService.remove(id);

  if (!success) {
    return res.sendStatus(500);
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  try {
    const { id } = req.params;
    const { name } = req.body;

    if (!name) {
      return res.status(400).json({
        message: 'Name is required',
      });
    }

    const existingUser = await usersService.getById(id);

    if (!existingUser) {
      return res.status(404).json({
        message: 'This id was not found',
      });
    }

    const updated = await usersService.update(id, name);

    if (!updated) {
      return res.status(404).json({
        message: 'User not found or no changes were made',
      });
    }

    res.status(200).json(updated);
  } catch (error) {
    /* eslint-disable no-console */
    console.error(error);
    res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = {
  get,
  create,
  getById,
  remove,
  update,
};
