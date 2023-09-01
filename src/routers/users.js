'use strict';

const express = require('express');
const usersController = require('../controllers/users');
const { validateUser } = require('../middlewares/users');
const router = express.Router();

router.post('/', validateUser(), usersController.create);
router.get('/', usersController.getAll);
router.get('/:userId', usersController.getById);
router.delete('/:userId', usersController.remove);

router.patch(
  '/:userId',
  validateUser({ required: false }),
  usersController.update
);

module.exports = router;
