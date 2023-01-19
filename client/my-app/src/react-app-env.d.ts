/// <reference types="react-scripts" />
interface Expense {
  id: string,
  userId: string,
  title: string,
  amount: number,
  spentAt?: string,
  category: string,
  note?: string,
};

interface User {
  id: string,
  name: string,
};
