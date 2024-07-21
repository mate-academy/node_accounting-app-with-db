const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user.controller');
const { ROUTES } = require('./routes');

router.get(ROUTES.USERS, UserController.getUsers);
router.post(ROUTES.USERS, UserController.addUser);
router.get(ROUTES.USER_ID, UserController.getUser);
router.delete(ROUTES.USER_ID, UserController.deleteUser);
router.patch(ROUTES.USER_ID, UserController.updateUser);

module.exports = router;
