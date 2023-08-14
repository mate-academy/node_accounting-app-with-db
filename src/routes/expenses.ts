'use strict'

import { Router } from 'express'
import { ExpensesController } from '../controllers'
import { ExpensesService } from '../services'

export default class ExpensesRouter {
  private router: Router = Router();

  private controller: ExpensesController;

  private constructor (service: ExpensesService) {
    this.controller = new ExpensesController(service)
  }

  public static create (service: ExpensesService) {
    const { router, controller } = new ExpensesRouter(service)

    router.get('/', controller.getAll)

    router.get('/:expenseId', controller.getById)

    router.post('/', controller.create)

    router.delete('/:expenseId', controller.remove)

    router.patch('/:expenseId', controller.update)

    return router
  }
}
