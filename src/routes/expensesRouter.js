'use strict';

const { Router } = require('express');
const {
  get,
  getOne,
  post,
  remove,
  patch,
} = require('../controllers/expensesController');

const expensesRouter = Router();

expensesRouter.get('/', get);
expensesRouter.get('/:id', getOne);
expensesRouter.post('/', post);
expensesRouter.delete('/:id', remove);
expensesRouter.patch('/:id', patch);

module.exports = {
  expensesRouter,
};
