const express = require('express');
const router = express.Router();
const userController = require('../controllers/controllerUser');

router.get('/', userController.getAll);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
