import { PrismaClient } from '@prisma/client'

export default class UsersStorage {
  private constructor (private prismaClient: PrismaClient) {}

  static create (prismaClient: PrismaClient) {
    return new UsersStorage(prismaClient)
  }

  get findMany () {
    return this.prismaClient.user.findMany
  }

  get findUnique () {
    return this.prismaClient.user.findUnique
  }

  get create () {
    return this.prismaClient.user.create
  }

  get delete () {
    return this.prismaClient.user.delete
  }

  get update () {
    return this.prismaClient.user.update
  }
}
