'use strict';

const { userService } = require('../services/user.service.js');

const get = async(req, res) => {
  const users = await userService.getAll();

  res.send(users);
};

const getOne = async(req, res) => {
  const { id } = req.params;

  const user = await userService.getById(id);

  res.send(user);
};

const create = async(req, res) => {
  const { name } = req.body;

  const user = await userService.create(name);

  res.statusCode = 201;

  res.send(user);
};

const update = async(req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  await userService.update({
    id,
    name,
  });

  const updatedUser = await userService.getById(id);

  res.send(updatedUser);
};

const remove = async(req, res) => {
  const { id } = req.params;

  await userService.remove(id);

  res.sendStatus(204);
};

module.exports.userController = {
  get,
  getOne,
  create,
  update,
  remove,
};
