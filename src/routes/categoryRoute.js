const express = require('express');
const categoryController = require('../controllers/categoryController.js');

const router = express.Router();

router.get('/', categoryController.getAll);

router.get('/:id', categoryController.getOne);

router.post('/', categoryController.create);

router.delete('/:id', categoryController.remove);

router.patch('/:id', categoryController.update);

module.exports = router;
