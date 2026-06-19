const router = require('express').Router();
const userController = require('../api/user.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.delete('/:id', userController.deleteById);
router.patch('/:id', userController.update);

module.exports = {
  router,
};
