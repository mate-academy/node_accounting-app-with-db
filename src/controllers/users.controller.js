/* eslint-disable curly */
'use strict';

const { validate: isUuid } = require('uuid');
const { usersService } = require('../services/users.service.js');

const getAll = async (req, res) => {
  const users = await usersService.getAll();

  res.json(users.map((user) => usersService.normalize(user)));
};

const getOne = async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const user = await usersService.getById(id);

  if (!user) return res.sendStatus(404);

  res.json(usersService.normalize(user.toJSON()));
};

const create = async (req, res) => {
  const name = req.body.name;

  if (!name) return res.sendStatus(400);

  const user = await usersService.create(name);

  res.status(201).json(usersService.normalize(user));
};

const deleteOne = async (req, res) => {
  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const user = await usersService.getById(id);

  if (!user) return res.sendStatus(404);

  await usersService.deleteById(id);

  res.sendStatus(204);
};

const update = async (req, res) => {
  const body = req.body || {};
  const filteredBody = Object.fromEntries(
    Object.entries(body).filter(([_, value]) => Boolean(value)),
  );

  const { id } = req.params;

  if (!isUuid(id)) return res.sendStatus(404);

  const user = await usersService.getById(id);

  if (!user) return res.sendStatus(404);

  await user.update(filteredBody);

  res.json(usersService.normalize(user.toJSON()));
};

module.exports = {
  usersController: {
    getAll,
    getOne,
    create,
    deleteOne,
    update,
  },
};
