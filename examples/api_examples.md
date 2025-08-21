# 📚 Приклади використання API

## 🔧 Налаштування

### Base URL
```
http://localhost:5700/api
```

### Headers
```bash
Content-Type: application/json
```

## 📁 Категорії (Categories)

### 1. Отримати всі категорії
```bash
curl -X GET http://localhost:5700/api/categories
```

### 2. Створити нову категорію
```bash
curl -X POST http://localhost:5700/api/categories \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Подорожі",
    "description": "Витрати на подорожі та відпочинок",
    "color": "#FF6B6B"
  }'
```

### 3. Отримати категорію за ID
```bash
curl -X GET http://localhost:5700/api/categories/1
```

### 4. Оновити категорію
```bash
curl -X PUT http://localhost:5700/api/categories/1 \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Подорожі та відпочинок",
    "description": "Оновлений опис категорії",
    "color": "#FF5252"
  }'
```

### 5. Видалити категорію
```bash
curl -X DELETE http://localhost:5700/api/categories/1
```

## 👥 Користувачі (Users)

### 1. Створити нового користувача
```bash
curl -X POST http://localhost:5700/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "email": "user@example.com",
    "password": "password123",
    "firstName": "Іван",
    "lastName": "Петренко"
  }'
```

### 2. Отримати всіх користувачів
```bash
curl -X GET http://localhost:5700/api/users
```

### 3. Отримати користувача за ID
```bash
curl -X GET http://localhost:5700/api/users/1
```

## 💰 Витрати (Expenses)

### 1. Створити нову витрату
```bash
curl -X POST http://localhost:5700/api/expenses \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 100.50,
    "description": "Обід у ресторані",
    "categoryId": 1,
    "userId": 1,
    "date": "2024-01-15",
    "notes": "Бізнес-ланч з клієнтом"
  }'
```

### 2. Отримати всі витрати
```bash
curl -X GET http://localhost:5700/api/expenses
```

### 3. Отримати витрати з фільтрами
```bash
# За користувачем
curl -X GET "http://localhost:5700/api/expenses?userId=1"

# За категорією
curl -X GET "http://localhost:5700/api/expenses?categoryId=1"

# За періодом
curl -X GET "http://localhost:5700/api/expenses?startDate=2024-01-01&endDate=2024-01-31"

# Комбіновані фільтри
curl -X GET "http://localhost:5700/api/expenses?userId=1&categoryId=1&startDate=2024-01-01"
```

### 4. Отримати витрату за ID
```bash
curl -X GET http://localhost:5700/api/expenses/1
```

### 5. Оновити витрату
```bash
curl -X PUT http://localhost:5700/api/expenses/1 \
  -H "Content-Type: application/json" \
  -d '{
    "amount": 120.00,
    "description": "Обід у ресторані (оновлено)",
    "notes": "Бізнес-ланч з клієнтом - оновлено"
  }'
```

### 6. Видалити витрату
```bash
curl -X DELETE http://localhost:5700/api/expenses/1
```

## 📊 Статистика

### 1. Загальна статистика
```bash
curl -X GET http://localhost:5700/api/statistics
```

### 2. Статистика за користувачем
```bash
curl -X GET "http://localhost:5700/api/statistics?userId=1"
```

### 3. Статистика за періодом
```bash
curl -X GET "http://localhost:5700/api/statistics?startDate=2024-01-01&endDate=2024-01-31"
```

## 🧪 Тестування з Postman

### Імпорт колекції
1. Відкрийте Postman
2. Натисніть "Import"
3. Скопіюйте наступний JSON:

```json
{
  "info": {
    "name": "Бухгалтерський застосунок API",
    "description": "API для тестування бухгалтерського застосунку"
  },
  "item": [
    {
      "name": "Категорії",
      "item": [
        {
          "name": "Отримати всі категорії",
          "request": {
            "method": "GET",
            "url": "http://localhost:5700/api/categories"
          }
        },
        {
          "name": "Створити категорію",
          "request": {
            "method": "POST",
            "url": "http://localhost:5700/api/categories",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"name\": \"Тестова категорія\",\n  \"description\": \"Опис тестової категорії\",\n  \"color\": \"#FF0000\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Користувачі",
      "item": [
        {
          "name": "Створити користувача",
          "request": {
            "method": "POST",
            "url": "http://localhost:5700/api/users",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"email\": \"test@example.com\",\n  \"password\": \"password123\",\n  \"firstName\": \"Тест\",\n  \"lastName\": \"Користувач\"\n}"
            }
          }
        }
      ]
    },
    {
      "name": "Витрати",
      "item": [
        {
          "name": "Створити витрату",
          "request": {
            "method": "POST",
            "url": "http://localhost:5700/api/expenses",
            "header": [
              {
                "key": "Content-Type",
                "value": "application/json"
              }
            ],
            "body": {
              "mode": "raw",
              "raw": "{\n  \"amount\": 50.00,\n  \"description\": \"Тестова витрата\",\n  \"categoryId\": 1,\n  \"userId\": 1,\n  \"notes\": \"Тестова нотатка\"\n}"
            }
          }
        }
      ]
    }
  ]
}
```

## 🐍 Python приклад

```python
import requests
import json

BASE_URL = "http://localhost:5700/api"

def create_category(name, description, color):
    url = f"{BASE_URL}/categories"
    data = {
        "name": name,
        "description": description,
        "color": color
    }
    response = requests.post(url, json=data)
    return response.json()

def get_categories():
    url = f"{BASE_URL}/categories"
    response = requests.get(url)
    return response.json()

def create_expense(amount, description, category_id, user_id):
    url = f"{BASE_URL}/expenses"
    data = {
        "amount": amount,
        "description": description,
        "categoryId": category_id,
        "userId": user_id
    }
    response = requests.post(url, json=data)
    return response.json()

# Приклад використання
if __name__ == "__main__":
    # Створити категорію
    category = create_category("Тест", "Тестова категорія", "#FF0000")
    print(f"Створено категорію: {category}")

    # Отримати всі категорії
    categories = get_categories()
    print(f"Категорії: {categories}")

    # Створити витрату
    expense = create_expense(100.50, "Тестова витрата", 1, 1)
    print(f"Створено витрату: {expense}")
```

## 🔍 JavaScript (Node.js) приклад

```javascript
const axios = require('axios');

const BASE_URL = 'http://localhost:5700/api';

async function testAPI() {
  try {
    // Створити категорію
    const categoryResponse = await axios.post(`${BASE_URL}/categories`, {
      name: 'JavaScript Test',
      description: 'Тестова категорія з JS',
      color: '#00FF00'
    });
    console.log('Створено категорію:', categoryResponse.data);

    // Отримати всі категорії
    const categoriesResponse = await axios.get(`${BASE_URL}/categories`);
    console.log('Категорії:', categoriesResponse.data);

    // Створити витрату
    const expenseResponse = await axios.post(`${BASE_URL}/expenses`, {
      amount: 75.25,
      description: 'Тестова витрата з JS',
      categoryId: 1,
      userId: 1
    });
    console.log('Створено витрату:', expenseResponse.data);

  } catch (error) {
    console.error('Помилка:', error.response?.data || error.message);
  }
}

testAPI();
```

## 📝 Примітки

- Всі запити повинні мати заголовок `Content-Type: application/json`
- Дати передаються у форматі `YYYY-MM-DD`
- Суми передаються як числа (не рядки)
- ID категорій та користувачів повинні існувати перед створенням витрат
- При видаленні категорії перевіряється, чи немає пов'язаних витрат
