'use strict'

import { Router } from 'express'
import { UsersController } from '../controllers'
import { UsersService } from '../services'

export default class UsersRouter {
  private router: Router = Router();

  private controller: UsersController;

  private constructor (service: UsersService) {
    this.controller = new UsersController(service)
  }

  public static create (service: UsersService) {
    const { router, controller } = new UsersRouter(service)

    router.get('/', controller.getAll)

    router.get('/:userId', controller.getById)

    router.post('/', controller.create)

    router.delete('/:userId', controller.remove)

    router.patch('/:userId', controller.update)

    return router
  }
}
