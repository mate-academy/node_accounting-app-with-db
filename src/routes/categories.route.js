/* eslint-disable */

const express = require('express');
const categoriesController = require('../controllers/Categories.controller');

const router = express.Router();

router.get('/', categoriesController.get);
router.get('/:id', categoriesController.getOne);
router.post('/', categoriesController.create);
router.patch('/:id', categoriesController.update);
router.put('/:id', categoriesController.update);
router.delete('/:id', categoriesController.remove);

module.exports = router;
