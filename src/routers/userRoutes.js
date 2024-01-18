'use strict';

const {
  get,
  getOne,
  add,
  removeOne,
  updateOne,
} = require('../controllers/userController');

const express = require('express');
const router = express.Router();

router.get('/', get);
router.post('/', add);
router.get('/:id', getOne);
router.delete('/:id', removeOne);
router.patch('/:id', updateOne);

module.exports = {
  router,
};
