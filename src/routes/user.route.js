'use strict';

const express = require('express');
const usersContoller = require('../controllers/user.controller');

const router = express.Router();

router.get('/', usersContoller.get);

router.post('/', usersContoller.create);

router.get('/:id', usersContoller.getOne);

router.delete('/:id', usersContoller.remove);

router.patch('/:id', usersContoller.update);

module.exports = router;
