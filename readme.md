# Accounting app (with Node.js and PostgreSQL)
Take the Accounting app from prev lesson and use PostgreSQL as a storage

- Implement CRUD page to manage categories

Data types:
User {
  id: number, // is puted by PostgreSQL itself, is primary key
  name: string,
}

Expense {
  id: number, // is puted by PostgreSQL itself, is primary key
  userId: number,
  title: string,
  spentAt: new Date(),
  amount: number,
  category: string,
  note: string,
}

The following table shows overview of the Rest APIs that will be exported:

GET /users get all Users
GET /users/:id get User by id
POST /users add new User (name string field is required)
PATCH /users/:id update User by id (name string field is required)
DELETE /users/:id remove User by id

GET /expenses get all Expenses
GET /expenses/:expenseId get Expense by id
GET /expenses?userId=userId get Expenses by userId
GET /expenses?category=category get Expenses by category
GET /expenses?from=from&to=to get Expenses in date range
GET /expenses?userId=userId&category=category get Expenses by category and userId
GET /expenses?userId=userId&category=category&from=from&to=to get Expenses by category and userId in date range
POST /expenses add new Expense (string title, number amount (can be decimal) and string category are required, string note and new Date spentAt (will be added at current time by default) are optional)
PATCH /expenses/:expenseId update Expense by id (at least one field change is required)
DELETE /expenses/:expenseId remove Expense by id


**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**
