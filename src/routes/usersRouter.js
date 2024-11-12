const express = require('express');
const { checkRequiredFields } = require('../middlewares/checkRequiredFields');
const userController = require('../controllers/usersController');
const { checkIfExists } = require('../middlewares/checkIfExist');
const router = express.Router();

router.get('/', userController.get);

router.post('/', checkRequiredFields(['name']), userController.create);

router.get('/:id', checkIfExists('user'), userController.getOne);

router.delete('/:id', checkIfExists('user'), userController.remove);

router.patch('/:id', checkIfExists('user'), userController.update);

module.exports = { router };
