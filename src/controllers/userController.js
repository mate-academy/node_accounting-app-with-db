const userService = require('../services/userService');

const getAllController = async (req, res) => {
  const users = await userService.getAll();

  res.json(users);
};

const getByIdController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.json(user);
};

const createController = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const user = await userService.create(name);

  res.status(201).json(user);
};

const deleteOneController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const deleted = await userService.deleteById(id);

  if (!deleted) {
    return res.status(404).json({ message: 'User not found' });
  }
  res.sendStatus(204);
};

const updateController = async (req, res) => {
  const id = Number(req.params.id);

  if (!req.params.id || Number.isNaN(id)) {
    return res.status(400).json({
      message: 'The required path parameter id is missing or invalid',
    });
  }

  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ message: 'Required field missing' });
  }

  const user = await userService.getById(Number(req.params.id));

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const updatedUser = await userService.update({
    id: Number(req.params.id),
    name,
  });

  res.json(updatedUser);
};

module.exports = {
  getAllController,
  getByIdController,
  createController,
  deleteOneController,
  updateController,
};
