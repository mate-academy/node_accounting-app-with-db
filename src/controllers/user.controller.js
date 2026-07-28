'use strict';

const userService = require('../services/user.service');

const getAll = async (req, res, next) => {
  try {
    const users = await userService.getAll();

    res.send(users);
  } catch (err) {
    next(err);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.getById(id);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  } catch (err) {
    next(err);
  }
};

const create = async (req, res, next) => {
  try {
    const user = await userService.create(req.body);

    res.status(201).send(user);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ message: err.message });
    }
    next(err);
  }
};

const update = async (req, res, next) => {
  try {
    const { id } = req.params;
    const user = await userService.update(id, req.body);

    if (!user) {
      return res.sendStatus(404);
    }

    res.send(user);
  } catch (err) {
    if (err.status) {
      return res.status(err.status).send({ message: err.message });
    }
    next(err);
  }
};

const remove = async (req, res, next) => {
  try {
    const { id } = req.params;
    const isDeleted = await userService.remove(id);

    if (!isDeleted) {
      return res.sendStatus(404);
    }

    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
