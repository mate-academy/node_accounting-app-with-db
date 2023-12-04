'use strict';

const service = require('../services/users.service');
const validateUserRequest = require('../validation/usersValidate');

const normalize = ({ id, name }) => ({
  id, name,
});

// eslint-disable-next-line space-before-function-paren
const get = async (req, res) => {
  // eslint-disable-next-line space-before-function-paren
  validateUserRequest(req, res, async () => {
    const data = (await service.getAll()).map(value => normalize(value));

    res.send(data);
  });
};

// eslint-disable-next-line space-before-function-paren
const post = async (req, res) => {
  const { name } = req.body;

  if (!name) {
    res.status(400).json({ message: 'Name is required.' });

    return;
  }

  const data = await service.add(name);

  res.statusCode = 201;
  res.send(normalize(data));
};

// eslint-disable-next-line space-before-function-paren
const getUser = async (req, res) => {
  // eslint-disable-next-line space-before-function-paren
  validateUserRequest(req, res, async () => {
    const searchedUser = await service.getById(+req.params.id);

    if (!searchedUser) {
      res.sendStatus(404);

      return;
    }

    res.send(normalize(searchedUser));
  });
};

// eslint-disable-next-line space-before-function-paren
const removeUser = async (req, res) => {
  // eslint-disable-next-line space-before-function-paren
  validateUserRequest(req, res, async () => {
    try {
      await service.remove(+req.params.id);
      res.sendStatus(204);
    } catch (error) {
      res.status(404).send({ message: error });
    }
  });
};

// eslint-disable-next-line space-before-function-paren
const updateUser = async (req, res) => {
  // eslint-disable-next-line space-before-function-paren
  validateUserRequest(req, res, async () => {
    if (!req.body || !req.params.id) {
      res.sendStatus(400);

      return;
    }

    const data = await service.update(+req.params.id, req.body.name);

    if (!data) {
      res.sendStatus(404);

      return;
    }

    res.send(normalize(data));
  });
};

module.exports = {
  get,
  post,
  getUser,
  removeUser,
  updateUser,
};
