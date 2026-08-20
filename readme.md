# Accounting app (with Node.js and PostgreSQL)
Take the Accounting app from prev lesson and use PostgreSQL as a storage

# Requirements

Implement a REST API server using Node.js that manages **Users** and **Expenses**.

## Users API

### POST /users
- Create a user  
- Body: `{ name }`  
- Returns: `201` with created user  
- Returns `400` if `name` is missing  

### GET /users
- Returns all users (`200`)  

### GET /users/:id
- Returns a user (`200`)  
- Returns `404` if not found  

### PATCH /users/:id
- Update user name  
- Returns updated user (`200`)  
- Returns `404` if not found  

### DELETE /users/:id
- Deletes user  
- Returns `204`  
- Returns `404` if not found  

---

## Expenses API

### POST /expenses
- Create an expense  
- Required: `spentAt`, `title`, `amount`, `userId`  
- Optional: `category`, `note`  
- Returns: `201` with created expense  
- Returns `400` if required fields are missing or user not found  

### GET /expenses
- Returns all expenses (`200`)  
- Supports filters:
  - `userId`
  - `from` / `to` (date range)
  - `categories` (comma-separated)

### GET /expenses/:id
- Returns expense (`200`)  
- Returns `404` if not found  

### PATCH /expenses/:id
- Update expense fields  
- Returns updated expense (`200`)  
- Returns `404` if not found  

### DELETE /expenses/:id
- Deletes expense  
- Returns `204`  
- Returns `404` if not found  

---

## General

- Use JSON for all requests/responses  
- Set header: `Content-Type: application/json; charset=utf-8`  
- Use proper HTTP status codes (`200`, `201`, `204`, `400`, `404`)  
- Persist data using a database (e.g. Sequelize)  

# Note
- You can sync models by running `npm run test`
- in local env, tests interect with your local database, so rows can be changed or removed


**Read [the guideline](https://github.com/mate-academy/js_task-guideline/blob/master/README.md) before start**
