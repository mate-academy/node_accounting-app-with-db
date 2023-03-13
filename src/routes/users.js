'use strict';

const usersController = require('../controllers/users');
const express = require('express');
const { catchError } = require('../utils/catchError');

const router = express.Router();

router.get('/', catchError(usersController.getAll));
router.get('/:id', catchError(usersController.getById));
router.post('/', express.json(), catchError(usersController.add));
router.delete('/:id', catchError(usersController.remove));
router.patch('/:id', express.json(), catchError(usersController.update));

module.exports = router;
