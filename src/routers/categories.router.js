const express = require('express');
const categoryController = require('../controllers/categories.controller.js');
const router = express.Router();

router.get('/', categoryController.get);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.put('/:id', categoryController.update);
router.patch('/:id', categoryController.update);
router.delete('/:id', categoryController.remove);

module.exports = router;
