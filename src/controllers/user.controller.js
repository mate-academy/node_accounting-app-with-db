const { validationResult, matchedData } = require('express-validator');
const userService = require('../services/user.service');
const { User } = require('../models/User.model');

const getAll = async (req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const userId = req.params.id;

  const user = await userService.getById(userId);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  res.send(user);
};

const create = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const data = matchedData(req, { locations: ['body'] });

  const newUser = await userService.create(data);

  res.status(201).send(newUser);
};

const update = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const userId = req.params.id;
  const data = matchedData(req, { locations: ['body'] });

  const updatedUser = await userService.updateById(userId, data);

  if (!updatedUser[0]) {
    return res.status(404).send('Not Found');
  }

  res.send(await User.findByPk(userId));
};

const remove = async (req, res) => {
  const validationResults = validationResult(req);

  if (!validationResults.isEmpty()) {
    return res.status(400).send(validationResults.array());
  }

  const id = req.params.id;

  const user = await userService.getById(id);

  if (!user) {
    return res.status(404).send('Not Found');
  }

  await userService.deleteById(id);

  res.status(204).send();
};

module.exports = {
  getAll,
  getOne,
  create,
  update,
  remove,
};
