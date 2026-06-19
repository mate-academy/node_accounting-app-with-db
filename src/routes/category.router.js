const express = require('express');
const categoryController = require('../controllers/category.controller');

const router = express.Router();

router.route('/').get(categoryController.get).post(categoryController.create);

router
  .route('/:id')
  .get(categoryController.getOne)
  .patch(categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
