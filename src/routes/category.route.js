const express = require('express');
const {
  get,
  getById,
  createCategory,
  updateCategory,
  removeCategory,
} = require('../controllers/category.controller');

const categoryRouter = express.Router();

categoryRouter.get('/', get);

categoryRouter.get('/:id', getById);

categoryRouter.post('/', express.json(), createCategory);

categoryRouter.patch('/:id', express.json(), updateCategory);

categoryRouter.delete('/:id', removeCategory);

module.exports = {
  categoryRouter,
};
