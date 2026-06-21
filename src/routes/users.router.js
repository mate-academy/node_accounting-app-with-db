/* eslint-disable curly */
const express = require('express');
const { usersController } = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', usersController.getAll);

router.post('/', usersController.create);

router.delete('/:id', usersController.deleteOne);

router.get('/:id', usersController.getOne);

router.put('/:id', usersController.update);

router.patch('/:id', usersController.update);

module.exports = router;
