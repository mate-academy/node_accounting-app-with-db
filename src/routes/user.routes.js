const express = require('express');
const usersControler = require('../controlers/user.controler');

const router = express.Router();

router.get('/', usersControler.getAll);

router.get('/:id', usersControler.getOne);

router.post('/', usersControler.add);

router.delete('/:id', usersControler.remove);

router.patch('/:id', usersControler.update);

module.exports = router;
