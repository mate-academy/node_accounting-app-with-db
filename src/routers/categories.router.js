const { Router } = require('express');
const {
  getAll,
  getOne,
  create,
  patch,
  deleteOnce,
} = require('../controllers/categories.controller.js');

const router = Router();

router.get('/', getAll);
router.get('/:id', getOne);
router.post('/', create);
router.patch('/:id', patch);
router.delete('/:id', deleteOnce);

module.exports = { router };
