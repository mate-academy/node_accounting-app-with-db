'use strict';

const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController.js');
const userServices = require('../services/userServices.js');

const isValidAdd = async(req, res, next) => {
  const { name } = req.body;

  if (!name) {
    res.sendStatus(400);

    return;
  }

  next();
};

const isValidId = async(req, res, next) => {
  const { userId } = req.params;

  try {
    const foundUser = await userServices.getUserById(userId);

    if (!foundUser) {
      res.sendStatus(404);

      return;
    }

    next();
  } catch (error) {
    res.sendStatus(500);
  }
};

const isValidUpdate = async(req, res, next) => {
  const { name } = req.body;

  if (!name || typeof name !== 'string') {
    res.sendStatus(400);

    return;
  }

  next();
};

router.get(
  '/',
  express.json(),
  userController.getAll
);

router.post(
  '/',
  express.json(),
  isValidAdd,
  userController.add
);

router.get(
  '/:userId',
  express.json(),
  userController.getCurrentUser
);

router.delete(
  '/:userId',
  isValidId,
  userController.remove
);

router.patch(
  '/:userId',
  express.json(),
  isValidId,
  isValidUpdate,
  userController.update
);

module.exports = {
  router,
};
