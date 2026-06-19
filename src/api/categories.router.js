const express = require('express');
const router = express.Router();
const categoriesController = require('../controllers/categories.controller');

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.getById);
router.post('/', categoriesController.create);
router.patch('/:id', categoriesController.update);
router.delete('/:id', categoriesController.deleteById);

module.exports = router;
