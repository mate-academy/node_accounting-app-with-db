'use strict';

const express = require('express');
const userControllers = require('../controllers/users');

const router = express.Router();

router.get('/', userControllers.getAll);

router.get('/:id', userControllers.getOne);

router.post('/', userControllers.add);

router.put('/:id', userControllers.update);

router.delete('/:id', userControllers.remove);

module.exports = router;
