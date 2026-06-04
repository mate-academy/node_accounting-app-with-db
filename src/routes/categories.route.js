const express = require('express');
const categoriesController = require('../controllers/categories.controller');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId) || numericId <= 0) {
    return res
      .status(400)
      .json({ error: 'Invalid ID. Must be a positive integer.' });
  }

  req.id = numericId;

  next();
});

router.get('/', categoriesController.get);
router.post('/', categoriesController.create);
router.get('/:id', categoriesController.getOne);
router.delete('/:id', categoriesController.remove);
router.patch('/:id', categoriesController.update);

module.exports = router;
