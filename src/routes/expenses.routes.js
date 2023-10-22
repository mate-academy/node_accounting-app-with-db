'use strict';

const express = require('express');

const expencesController = require('../controllers/expenses.controller');

const router = express.Router();

router.get('/', expencesController.getAll);
router.get('/:id', expencesController.getOne);
router.post('/', express.json(), expencesController.create);
router.patch('/:id', express.json(), expencesController.update);
router.delete('/:id', expencesController.remove);

module.exports = router;
