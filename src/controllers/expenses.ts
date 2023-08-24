'use strict'

import { Request } from 'express'

import { ExpensesService } from '../services'
import { ensure } from '../utils'
import type { ExpenseResponse } from '../types'

export default class ExpensesController {
  constructor (private expensesService: ExpensesService) {}

  public getAll = async (req: Request, res: ExpenseResponse) => {
    const { userId, categories, from, to } = req.body

    const expenses = await this.expensesService.getAll({
      userId,
      categories,
      from,
      to
    })

    res.send(expenses)
  }

  public getById = async (req: Request, res: ExpenseResponse) => {
    const { expenseId } = req.params

    ensure(expenseId, 'Expense id is required')

    const expense = await this.expensesService.getById(+expenseId)

    if (!expense) {
      res.status(404).send({ error: 'Expense not found' })
      return
    }

    res.send(expense)
  }

  public create = async (req: Request, res: ExpenseResponse) => {
    const { userId, spentAt, title, amount, category, note } = req.body

    const expenseData = { userId, spentAt, title, amount, category, note }

    try {
      const expense = await this.expensesService.create(expenseData)

      res.status(201).send(expense)
    } catch (error) {
      const message =
        error instanceof Error ? error.message : 'Error creating expense'
      res.status(400).send({ error: message })
    }
  }

  public remove = async (req: Request, res: ExpenseResponse) => {
    const { expenseId } = req.params

    const isDeleted = this.expensesService.deleteById(+expenseId)

    if (!isDeleted) {
      res.status(404).send({ error: 'Expense not found' })
      return
    }

    res.sendStatus(204)
  };

  public update = async (req: Request, res: ExpenseResponse) => {
    const { expenseId } = req.params
    const expenseData = req.body

    const expense = await this.expensesService.update(+expenseId, expenseData)

    if (!expense) {
      res.status(404).send({ error: 'Expense not found' })
      return
    }

    res.send(expense)
  };
}
