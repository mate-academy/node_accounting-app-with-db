import { PrismaClient } from '@prisma/client'

export default class ExpensesStorage {
  private constructor (private prismaClient: PrismaClient) {}

  static create (prismaClient: PrismaClient) {
    return new ExpensesStorage(prismaClient)
  }

  get findMany () {
    return this.prismaClient.expense.findMany
  }

  get findUnique () {
    return this.prismaClient.expense.findUnique
  }

  get create () {
    return this.prismaClient.expense.create
  }

  get delete () {
    return this.prismaClient.expense.delete
  }

  get update () {
    return this.prismaClient.expense.update
  }
};
