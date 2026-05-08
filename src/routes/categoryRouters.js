const express = require('express');
const { isValidId, isValidBody } = require('../middleware/middleware');
const categoryContriller = require('../controllers/categoryControllers');

const categoryRouter = express.Router();

categoryRouter.get('/', categoryContriller.getAllCats);

categoryRouter.get('/:id', isValidId, categoryContriller.getCatById);

categoryRouter.post(
  '/',
  express.json(),
  isValidBody,
  categoryContriller.addCat,
);

categoryRouter.patch(
  '/:id',
  isValidId,
  express.json(),
  isValidBody,
  categoryContriller.updateCat,
);

categoryRouter.delete('/:id', isValidId, categoryContriller.removeCat);

module.exports = categoryRouter;
