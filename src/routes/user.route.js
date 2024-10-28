const express = require('express');
const { validateFields } = require('./../middlewares/validateFields');
const { validateUser } = require('./../middlewares/validateUser');
const userController = require('./../controllers/user.controller');
const router = express.Router();

router.get('/', userController.get);

router.post('/', validateFields(['name']), userController.create);

router.get('/:id', validateUser(), userController.getOne);

router.delete('/:id', validateUser(), userController.remove);

router.patch('/:id', validateUser(), userController.update);

module.exports = { router };
