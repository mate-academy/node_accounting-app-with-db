const express = require('express');
const userController = require('../controllers/users.controller');

const router = express.Router();

router.param('id', (req, res, next, id) => {
  const numericId = Number(id);

  if (!Number.isInteger(numericId)) {
    res.sendStatus(400);

    return;
  }

  req.params.id = numericId;
  next();
});

router.get('/', userController.getAll);
router.get('/:id', userController.getUser);

router.post('/', userController.add);

router.patch('/:id', userController.update);

router.delete('/:id', userController.remove);

module.exports = router;
