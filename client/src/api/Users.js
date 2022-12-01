import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:3001'

export function getAll() {
  return axios.get('/users')
  .then(res => res.data)
  .catch(error => console.log(error))
}

export function addUser(name) {
  return axios.post('/users', { name })
  .then(res => res.data)
  .catch(error => console.log(error))
}

export function removeUser(id) {
  return axios.delete(`/users/${id}`)
  .then(res => res.data)
  .catch(error => console.log(error))
}

export function updateUser( id, name) {
  return axios.patch(`/users/${id}`, {name} )
  .then(res => res.data)
  .catch(error => console.log(error))
}