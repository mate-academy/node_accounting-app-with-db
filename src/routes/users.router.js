const express = require('express');
const userController = require('../controllers/user.controller');

const router = express.Router();

router.get('/', userController.getAll);
router.post('/', userController.create);

router.get('/:id', userController.getById);
router.patch('/:id', userController.update);
router.delete('/:id', userController.remove);

module.exports = router;
