const { Router } = require('express');
const {
  create: createUser,
  deleteOnce: deleteOnceUser,
  findAll: findAllUsers,
  findOnce: FindOnceUser,
  patchOnce: patchOnceUser,
} = require('../controllers/users.controller.js');

const router = Router();

router.get('/', findAllUsers);
router.post('/', createUser);
router.get('/:id', FindOnceUser);
router.delete('/:id', deleteOnceUser);
router.patch('/:id', patchOnceUser);

module.exports = { router };
