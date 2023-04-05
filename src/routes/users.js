'use strict';

const userControllers = require('../controllers/users');
const express = require('express');

const router = express.Router();

router.get('/', userControllers.getAll);
router.get('/:id', userControllers.getById);
router.post('/', userControllers.create);
router.patch('/:id', userControllers.update);
router.delete('/:id', userControllers.remove);

module.exports = router;
