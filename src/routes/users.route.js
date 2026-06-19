const router = require('express').Router();
const userController = require('../controllers/users.controller');

router.get('/', userController.getAll);
router.get('/:id', userController.getOne);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.delete('/:id', userController.removeUser);

module.exports = router;
