const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.get);
router.post('/', userController.create);
router.get('/:id', userController.getOne);
router.delete('/:id', userController.remove);
router.patch('/:id', userController.update);

module.exports = {
  router,
};
