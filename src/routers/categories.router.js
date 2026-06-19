const express = require('express');
const controller = require('../controllers/categories.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  controller.getAllCategories(req, res);
});

router.get('/:id', controller.getCategoryById);

router.post('/', controller.create);

router.delete('/:id', controller.remove);

router.patch('/:id', controller.update);

module.exports = router;
