'use strict'

import express, { json } from 'express'
import cors from 'cors'

import { PrismaClient } from '@prisma/client'

import { UsersService, ExpensesService } from './services'
import { UsersStorage, ExpensesStorage } from './storages'
import { serviceRegistry } from './services/serviceRegistry'
import { UsersRouter, ExpensesRouter } from './routes'

const createServices = (prismaClient: PrismaClient) => {
  const usersStorage = UsersStorage.create(prismaClient)
  const expensesStorage = ExpensesStorage.create(prismaClient)

  return {
    users: UsersService.create(usersStorage, serviceRegistry),
    expenses: ExpensesService.create(expensesStorage, serviceRegistry)
  }
}

const createRouters = (services: ReturnType<typeof createServices>) => {
  return {
    users: UsersRouter.create(services.users),
    expenses: ExpensesRouter.create(services.expenses)
  }
}

export default async function createServer () {
  const app = express()

  const prisma = new PrismaClient()
  prisma.$connect()

  const services = createServices(prisma)
  const { users, expenses } = createRouters(services)

  app.use(cors())
  app.use(json())
  app.use(express.urlencoded({ extended: true }))

  app.use('/users', users)

  app.use('/expenses', expenses)

  return app
}
