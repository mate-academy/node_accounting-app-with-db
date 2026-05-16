const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.get('/', categoryController.get);
router.get('/:id', categoryController.getOne);
router.post('/', express.json(), categoryController.create);
router.patch('/:id', express.json(), categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = { router };
