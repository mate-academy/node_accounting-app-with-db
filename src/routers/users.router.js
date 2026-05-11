const express = require('express');
const usersControllers = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', usersControllers.getAll);
router.post('/', usersControllers.create);
router.get('/:id', usersControllers.getById);
router.delete('/:id', usersControllers.removeById);
router.patch('/:id', usersControllers.update);

module.exports = { router };
