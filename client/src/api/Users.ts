import axios from 'axios';

type ReqBody = {
  name: string;
};

export function getUsers() {
  return axios.get('http://localhost:3001/users').then((res) => res.data);
}

export function postUser(body: ReqBody) {
  return axios.post('http://localhost:3001/users', body);
}
