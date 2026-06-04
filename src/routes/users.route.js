const express = require('express');
const usersController = require('../controllers/users.controller');

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

router.get('/', usersController.get);
router.post('/', usersController.create);
router.get('/:id', usersController.getOne);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

module.exports = router;
