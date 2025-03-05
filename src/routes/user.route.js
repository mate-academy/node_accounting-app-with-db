const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', express.json(), userController.create);
router.delete('/:id', userController.remove);
router.patch('/:id', express.json(), userController.update);

module.exports = {
  router,
};
