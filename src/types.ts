import { Expense, User } from '@prisma/client'
import { Response } from 'express'

export type Error = { error: string };

export type UserResponse = Response<User | Error>;
export type ExpenseResponse = Response<Expense | Expense[] | Error>;
