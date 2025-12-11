'use strict';

const express = require('express');
const { createUser } = require('../controllers/user.controller');

const router = express.Router();

router.post('/', createUser);

module.exports = {
  userRouter: router,
};
