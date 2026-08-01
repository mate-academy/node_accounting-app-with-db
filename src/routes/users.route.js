const express = require('express');
const usersController = require('../controllers/users.controller');

const router = express.Router();

router.get('/', usersController.get);
router.get('/:id', usersController.getOne);
router.post('/', usersController.create);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

module.exports = router;
