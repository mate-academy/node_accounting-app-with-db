const controller = require('./expense.controller');
const express = require('express');

const router = express.Router();

router.get('/', controller.getAll);
router.get('/:id', controller.getById);
router.post('/', controller.add);
router.patch('/:id', controller.update);
router.delete('/:id', controller.deleteById);

module.exports = { router };
