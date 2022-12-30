export interface Expense {
  id: number,
  userId: number,
  title: string,
  amount: number,
  spentAt?: string,
  category: string,
  note?: string,
}
