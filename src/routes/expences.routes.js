const express = require('express');

const expencesRouter = express.Router();

const expencesController = require('../controllers/expences.controller');

expencesRouter.get('/', expencesController.getExpences);

expencesRouter.get('/all', expencesController.getAllExpences);

expencesRouter.get('/:id', expencesController.getExpenceById);

expencesRouter.post('/', expencesController.createExpence);

expencesRouter.delete('/:id', expencesController.deleteExpence);

expencesRouter.patch('/:id', expencesController.patchExpence);

module.exports = { expencesRouter };
