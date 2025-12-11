'use strict';

const express = require('express');

const {
  createCategory,
  getCategories,
} = require('../controllers/category.controller');

const router = express.Router();

router.post('/', createCategory);
router.get('/', getCategories);

module.exports = {
  categoryRouter: router,
};
