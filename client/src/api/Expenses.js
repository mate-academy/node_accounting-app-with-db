import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export function getAll() {
  return axios.get('/expenses')
  .then(res => res.data)
}

export function addExpense(userId, title, amount, category, note) {
  return axios.post('/expenses', { userId, title, amount, category, note })
  .then(res => res.data)
}

export function removeExpense(id) {
  return axios.delete(`/expenses/${id}`)
  .then(res => res.data)
}

export function updateExpense( id, title, amount, category, note) {
  return axios.patch(`/expenses/${id}`, {title, amount, category, note} )
  .then(res => res.data)
}