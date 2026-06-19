const express = require('express');
const userController = require('../controllers/userController.js');

const router = express.Router();

router.get('/', userController.getAll);

router.get('/:id', userController.getOne);

router.post('/', userController.create);

router.delete('/:id', userController.remove);

router.patch('/:id', userController.update);

module.exports = router;
