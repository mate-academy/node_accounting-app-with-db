'use strict';

const categoriesService = require('../services/categories.service');

const getAll = async (_, res) => {
  res.send(await categoriesService.getAll());
};

const getOne = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const category = await categoriesService.getById(id);

  if (!category) {
    res.sendStatus(404);

    return;
  }

  res.send(category);
};

const create = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  try {
    const category = await categoriesService.create(name);

    res.statusCode = 201;
    res.send(category);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Category name must be unique' });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};

const remove = async (req, res) => {
  const id = +req.params.id;

  if (isNaN(id)) {
    res.sendStatus(400);

    return;
  }

  const isDeleted = await categoriesService.remove(id);

  if (!isDeleted) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

const update = async (req, res) => {
  const id = +req.params.id;
  const { name } = req.body;

  if (isNaN(id) || !name) {
    res.sendStatus(400);

    return;
  }

  try {
    const result = await categoriesService.update(id, name);

    if (!result[0]) {
      res.sendStatus(404);

      return;
    }

    res.statusCode = 200;
    res.send(result[1][0]);
  } catch (error) {
    if (error.name === 'SequelizeUniqueConstraintError') {
      res.status(400).send({ error: 'Category name must be unique' });
    } else {
      res.status(500).send({ error: 'Internal server error' });
    }
  }
};

module.exports = {
  getAll,
  getOne,
  create,
  remove,
  update,
};
