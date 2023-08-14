'use strict'

import { Expense } from '@prisma/client'
import { ExpensesStorage } from '../storages'
import { ServiceRegistry } from './serviceRegistry'
import { isValidDateString } from '../shared/validation'
import { ensure } from '../utils'

interface ExpensesFilter {
  userId: number;
  categories?: string[];
  from?: string;
  to?: string;
}

interface FilterLike {
  userId: any;
  categories?: any;
  from?: any;
  to?: any;
}

interface ExpensesInput {
  userId: number;
  title: string;
  category: string;
  amount: string;
  spentAt: string;
  note: string | null;
}

export default class ExpensesService {
  private constructor (
    private storage: ExpensesStorage,
    private serviceRegistry: ServiceRegistry
  ) {
    serviceRegistry.register('ExpensesService', this)
  }

  public static create (storage: ExpensesStorage, serviceRegistry: ServiceRegistry) {
    return new ExpensesService(storage, serviceRegistry)
  }

  public async getAll (filter: FilterLike) {
    this.validateExpenseFilter(filter)

    return this.storage.findMany({
      where: {
        userId: { equals: filter.userId },
        spentAt: { gte: filter.from, lte: filter.to },
        category: { in: filter.categories }
      }
    })
  }

  public async getById (id: number) {
    return this.storage.findUnique({ where: { id } })
  }

  public async create (expenseData: ExpensesInput) {
    await this.validateCreateExpenseData(expenseData)

    return this.storage.create({ data: expenseData })
  }

  public async deleteById (id: number) {
    return this.storage.delete({ where: { id } })
  }

  public async update (id: number, updatedExpense: Partial<ExpensesInput>) {
    if (updatedExpense.spentAt && !isValidDateString(updatedExpense.spentAt)) {
      throw new Error('Invalid date')
    }

    return this.storage.update({ where: { id }, data: updatedExpense })
  }

  private async validateCreateExpenseData (expenseData: ExpensesInput) {
    const { userId, spentAt, title, amount, category } = expenseData

    const user = await this.serviceRegistry.get('UsersService').getById(userId)

    ensure(user, 'User not found')

    ensure(spentAt && title && amount && category, 'Missing required fields')

    if (!isValidDateString(spentAt)) {
      throw new Error('Invalid date')
    }
  }

  private validateExpenseFilter (filter: FilterLike): asserts filter is ExpensesFilter {
    ensure(filter.userId)

    if (filter.categories) {
      ensure(Array.isArray(filter.categories), 'Categories must be an array')
    }

    if (filter.from && !isValidDateString(filter.from)) {
      throw new Error('Invalid from date')
    }

    if (filter.to && !isValidDateString(filter.to)) {
      throw new Error('Invalid to date')
    }
  }
}
