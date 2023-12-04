'use strict';

const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.get('/', UserController.get);
router.post('/', UserController.create);
router.get('/:slug', UserController.getBySlug);
router.delete('/:slug', UserController.remove);
router.patch('/:slug', UserController.update);

module.exports = { UserRouter: router };
