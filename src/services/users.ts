'use strict'

import { UsersStorage } from '../storages'
import { ServiceRegistry } from './serviceRegistry'

export default class UsersService {
  private constructor (
    private storage: UsersStorage,
    private serviceRegistry: ServiceRegistry
  ) {
    this.serviceRegistry.register('UsersService', this)
  }

  public static create (storage: UsersStorage, serviceRegistry: ServiceRegistry) {
    return new UsersService(storage, serviceRegistry)
  }

  public async getAll () {
    return this.storage.findMany()
  }

  public async getById (id: number) {
    return this.storage.findUnique({ where: { id } })
  }

  public async create (name: string) {
    return this.storage.create({ data: { name } })
  }

  public async deleteById (id: number) {
    return this.storage.delete({ where: { id } })
  }

  public async update (id: number, name: string) {
    return this.storage.update({ where: { id }, data: { name } })
  }
}
