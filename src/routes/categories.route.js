const router = require('express').Router();

const categoriesController = require('../api/categories.controller');

router.get('/', categoriesController.getAll);
router.get('/:id', categoriesController.get);
router.post('/', categoriesController.create);
router.delete('/:id', categoriesController.remove);
router.patch('/:id', categoriesController.update);

module.exports = {
  router,
};
