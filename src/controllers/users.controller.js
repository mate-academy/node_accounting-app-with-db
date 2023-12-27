'use strict';

const usersService = require('./../services/user.service');

const get = async(req, res) => {
  res.send(await usersService.getUsers());
};

const getOne = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const oneUser = await usersService.getUserById(id);

  if (!oneUser) {
    res.sendStatus(404);
  }

  res.send(oneUser);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await usersService.createUser(name);

  res.sendStatus(201);
  res.send(newUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  if (!id) {
    res.sendStatus(400);
  }

  const deletedUser = await usersService.removeUser(id);

  if (!deletedUser) {
    res.sendStatus(404);
  }

  res.sendStatus(204);
};

const updateOne = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  if (!id || !name) {
    res.sendStatus(400);

    return;
  }

  const updatedUser = await usersService.updateUser(name, id);

  if (!updatedUser) {
    res.sendStatus(404);
  }

  res.send(updatedUser);
};

module.exports = {
  get, getOne, create, remove, updateOne,
};
