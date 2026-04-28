const express = require('express');
const CategoryController = require('../controllers/category.controller');

const router = express.Router();

router.route('/').get(CategoryController.get).post(CategoryController.create);

router
  .route('/:id')
  .get(CategoryController.getOne)
  .patch(CategoryController.update)
  .delete(CategoryController.remove);

module.exports = router;
