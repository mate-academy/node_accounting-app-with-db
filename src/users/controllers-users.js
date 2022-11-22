'use strict';

import * as userServices from './services-users.js';

export const getAll = async(req, res) => {
  const users = await userServices.getAll()

  res.send(users.map(userServices.normilize));
};

export const getUser = async(req, res) => {
  const { userId } = req.params;

  if (!userId) {
    res.sendStatus(400);

    return;
  }

  const findedUser = await userServices.getById(userId);

  if (!findedUser) {
    res.sendStatus(404);

    return;
  }

  res.send(userServices.normilize(findedUser));
};

export const createUser = async(req, res) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  const newUser = await userServices.create(name);

  res.statusCode = 201;

  res.send(userServices.normilize(newUser));
};

export const deleteUser = (req, res) => {
  const { userId } = req.params;

  if (!userServices.remove(userId)) {
    res.sendStatus(404);

    return;
  }

  res.sendStatus(204);
};

export const updateUser = async(req, res) => {
  const { userId } = req.params;
  const { name } = req.body;

  if (!userId) {
    res.sendStatus(404);

    return;
  }

   await userServices.update({ userId, name });

  res.sendStatus(202);
};
