'use strict';

const { Router } = require('express');
const statsController = require('../controllers/stats');

const router = Router();

router.get('/', statsController.getStats);

module.exports = { router };
