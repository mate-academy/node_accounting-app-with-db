const { Router } = require('express');
const usersController = require('../controllers/users.controller');

const router = Router();

router.get('/', usersController.getAll);

router.get('/:id', usersController.getById);

router.post('/', usersController.create);

router.delete('/:id', usersController.deleteById);

router.patch('/:id', usersController.update);

module.exports = router;
