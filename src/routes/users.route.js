'use strict';

const {
  get,
  add,
  getOne,
  removeOne,
  updateOne,
} = require('../controllers/users.controller');
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
