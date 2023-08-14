import UsersService from './users'
import ExpensesService from './expenses'

interface Services {
  UsersService: UsersService;
  ExpensesService: ExpensesService;
}

type ServiceMethods = {
  [K in keyof Services]: Services[K];
};

export class ServiceRegistry {
  private services: Partial<ServiceMethods> = {};

  public register<TName extends keyof ServiceMethods> (name: TName, service: ServiceMethods[TName]) {
    if (this.services[name]) {
      throw new Error(`ServiceRegistry already contains ${name}`)
    }

    this.services[name] = service
  }

  public get<TName extends keyof ServiceMethods> (name: TName): ServiceMethods[TName] {
    const result = this.services[name]
    if (!result) {
      throw new Error(`ServiceRegistry has no instance of ${name}`)
    }

    return result
  }
}

export const serviceRegistry = new ServiceRegistry()
