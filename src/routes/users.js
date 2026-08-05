const { Router } = require('express');
const usersController = require('../controllers/usersController');

const router = Router();

router.get('/', usersController.getAll);
router.get('/:id', usersController.getOne);
router.post('/', usersController.create);
router.delete('/:id', usersController.remove);
router.patch('/:id', usersController.update);

module.exports = router;
