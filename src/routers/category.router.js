const express = require('express');
const { categoryController } = require('../controllers/category.controller');
const router = express.Router();

router.route('/').get(categoryController.getAll).post(categoryController.add);

router
  .route('/:id')
  .get(categoryController.getById)
  .patch(categoryController.update)
  .delete(categoryController.remove);

module.exports = router;
