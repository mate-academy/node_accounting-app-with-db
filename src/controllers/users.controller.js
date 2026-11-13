const usersService = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  res.send(user);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({
      error: 'Name is required',
    });
  }

  const user = await usersService.create(name);

  res.statusCode = 201;
  res.send(user);
};

const remove = async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  await usersService.remove(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const { name } = req.body;
  const { id } = req.params;
  const user = await usersService.getById(id);

  if (!user) {
    return res.status(404).json({
      error: 'User not found',
    });
  }

  await usersService.update({ id, name });

  const updatedUser = await usersService.getById(id);

  res.send(updatedUser);
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
