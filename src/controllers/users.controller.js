'use strict';

const Express = require('express'); // eslint-disable-line
const usersService = require('../services/users.service');

module.exports = {
  get,
  getById,
  create,
  remove,
  update,
};

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function get(req, res) {
  const users = await usersService.getAll();

  res.status(200)
    .send(users.map(item => usersService.normalize(item.dataValues)));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function getById(req, res) {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400)
      .send('Required params { id: integer }');

    return;
  }

  const user = await usersService.getById(id);

  if (!user) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200)
    .send(usersService.normalize(user));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function create(req, res) {
  const { name } = req.body;

  if (typeof name !== 'string') {
    res.status(400)
      .send('Required params { name: string }');

    return;
  }

  const user = await usersService.create(name);

  res.status(201)
    .send(usersService.normalize(user));
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function remove(req, res) {
  const id = +req.params.id;

  if (!Number.isInteger(id)) {
    res.status(400)
      .send('Required params { id: integer }');

    return;
  }

  const removedCount = await usersService.removeById(id);

  if (removedCount !== 1) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.sendStatus(204);
}

/**
 * @param { Express.Request } req
 * @param { Express.Response } res */
async function update(req, res) {
  const id = +req.params.id;
  const { name } = req.body;

  if (!Number.isInteger(id)
    || typeof name !== 'string') {
    res.status(400)
      .send('Required params { id: integer } body { name: string }');

    return;
  }

  const [updatedCount, updatedRows] = await usersService.updateById({
    id,
    name,
  });

  if (!updatedRows[0].dataValues || updatedCount !== 1) {
    res.status(404)
      .send(`Expected entity doesn't exist`);

    return;
  }

  res.status(200)
    .send(updatedRows[0].dataValues);
}
