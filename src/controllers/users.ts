'use strict'

import { UsersService } from '../services'
import { Request, Response } from 'express'
import { User } from '@prisma/client'
import type { UserResponse } from '../types'

export default class UsersController {
  private usersService: UsersService;

  constructor (service: UsersService) {
    this.usersService = service
  }

  public getAll = async (_req: Request, res: Response<User[]>) => {
    const users = await this.usersService.getAll()

    res.send(users)
  }

  public getById = async (req: Request, res: UserResponse) => {
    const { userId } = req.params
    const user = await this.usersService.getById(+userId)

    if (!user) {
      res.status(404).send({ error: 'User not found' })
      return
    }

    res.send(user)
  }

  public create = async (req: Request, res: UserResponse) => {
    const { name: userName } = req.body

    if (typeof userName !== 'string') {
      res.status(400).send({ error: 'Name is required' })
      return
    }

    const user = await this.usersService.create(userName)

    res.status(201).send(user)
  }

  public remove = async (req: Request, res: UserResponse) => {
    const { userId } = req.params

    const isDeleted = await this.usersService.deleteById(+userId)

    if (!isDeleted) {
      res.status(404).send({ error: 'User not found' })
      return
    }

    res.sendStatus(204)
  }

  public update = async (req: Request, res: UserResponse) => {
    const { userId } = req.params
    const { name: userName } = req.body

    if (typeof userName !== 'string') {
      res.status(400).send({ error: 'Name is required' })
      return
    }

    const user = await this.usersService.update(+userId, userName)

    if (!user) {
      res.status(404).send({ error: 'User not found' })
      return
    }

    res.send(user)
  }
}
