const express = require('express');
const userController = require('../controllers/user.controller.js');
const router = express.Router();

router.get('/', userController.get);
router.get('/:id', userController.getById);
router.post('/', userController.create);
router.delete('/:id', userController.remove);
router.put('/:id', userController.update);
router.patch('/:id', userController.update);

module.exports = router;
