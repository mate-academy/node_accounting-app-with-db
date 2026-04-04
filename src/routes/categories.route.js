const categoriesController = require('../controllers/categories.controller');

const express = require('express');

module.exports = function () {
  const router = express.Router();

  router.get('/', categoriesController.get());

  router.get('/:id', categoriesController.getOne());

  router.post('/', categoriesController.create());

  router.patch('/:id', categoriesController.update());

  router.delete('/:id', categoriesController.remove());

  return router;
};
