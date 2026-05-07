const express = require('express');
const categoryController = require('../controllers/category.controller');
const router = express.Router();

router.get('/', categoryController.get);
router.get('/:id', categoryController.getById);
router.post('/', categoryController.create);
router.delete('/:id', categoryController.remove);
router.patch('/:id', categoryController.update);

module.exports = router;
