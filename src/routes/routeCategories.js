'use strict';

const express = require('express');
const router = express.Router();
const categoryController = require('../controllers/controllerCategory');

router.get('/', categoryController.getAll);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = router;
