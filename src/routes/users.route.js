import express from 'express';
import * as usersController from '../contollers/user.controller.js';

const router = express.Router();

router.get('/', usersController.get);

router.get('/:id', usersController.getOne);

router.post('/', usersController.create);

router.delete('/:id', usersController.remove);

router.patch('/:id', usersController.update);

export default router;
