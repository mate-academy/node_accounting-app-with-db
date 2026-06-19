const express = require('express');
const controller = require('../controllers/users.controller.js');

const router = express.Router();

router.get('/', (req, res) => {
  controller.getAllUsers(req, res);
});

router.get('/:id', controller.getUserById);

router.post('/', controller.create);

router.delete('/:id', controller.remove);

router.patch('/:id', controller.update);

module.exports = router;
