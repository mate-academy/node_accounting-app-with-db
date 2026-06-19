const router = require('express').Router();
const users = require('../controllers/users.controller');

router.get('/', users.getUsers);
router.post('/', users.createUser);
router.get('/:id', users.getUserById);
router.delete('/:id', users.deleteUserById);
router.patch('/:id', users.updateUserById);

module.exports = router;
