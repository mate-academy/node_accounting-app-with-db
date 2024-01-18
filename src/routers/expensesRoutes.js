'use strict';

const {
  getAll,
  add,
  getOne,
  removeOne,
  updateOne,
} = require('../controllers/expenseController');

const express = require('express');
const router = express.Router();

router.get('/', getAll);
router.post('/', add);
router.get('/:id', getOne);
router.delete('/:id', removeOne);
router.patch('/:id', updateOne);

module.exports = {
  router,
};
