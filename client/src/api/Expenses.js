import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export function getAll() {
  return axios.get('/expenses')
  .then(res => res.data)
  .catch(error => console.log(error));
}

export function addExpense(user_id, name, amount, category, note) {
  return axios.post('/expenses', { user_id, name, amount, category, note })
  .then(res => res.data)
  .catch(error => console.log(error))
}

export function removeExpense(id) {
  return axios.delete(`/expenses/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))
}

export function updateExpense( id, name, amount, category, note) {
  return axios.patch(`/expenses/${id}`, {name, amount, category, note} )
  .then(res => res.data)
  .catch(error => console.log(error))
}
