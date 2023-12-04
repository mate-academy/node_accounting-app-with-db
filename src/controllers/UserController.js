'use strict';

const UserService = require('../services/UserService');

const get = async(req, res) => {
  const users = await UserService.get();

  res.status(200).send(users);
};

const getBySlug = async(req, res) => {
  const { slug } = req.params;

  if (slug) {
    const user = await UserService.getBySlug({ slug });

    if (user) {
      res.status(200).send(user);

      return;
    }

    res.sendStatus(404);

    return;
  }

  res.sendStatus(400);
};

const create = async(req, res) => {
  const { name } = req.body;

  if (name) {
    const newUser = await UserService.create({ name });

    res.status(201).send(newUser);

    return;
  }

  res.sendStatus(400);
};

const remove = async(req, res) => {
  const { slug } = req.params;
  const user = await UserService.remove({ slug });

  if (user) {
    res.status(204).send(user);

    return;
  }

  res.sendStatus(404);
};

const update = async(req, res) => {
  const { slug } = req.params;
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);
  }

  const user = await UserService.update({
    slug, name,
  });

  if (user) {
    res.status(200);

    return;
  }

  res.sendStatus(404);
};

module.exports = {
  get,
  getBySlug,
  create,
  update,
  remove,
};
