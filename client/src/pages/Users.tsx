import { FormEvent, useState } from 'react'
import UserCard from '../components/UserCard';
import { useUser } from '../context/context';
import axios from 'axios';

const Users = () => {
  // const [isActive, setIsActive] = useState(false);
  const {users,createUser, getUsers} = useUser();
  const [isLoading,setIsLoading] = useState(false);
  const [newUser, setNewUser] = useState('');

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    axios
    .post('http://localhost:8080/users', {
      name: newUser
    })
    .then(result => {
      getUsers();
      setNewUser('')
    })
    .catch(err => console.log(err))
  }
  return (
    <main className='section'>
      <h1>Users</h1>
      <form onSubmit={submit}  className='box'>
        <input
          className='input is-primary'
          type="text"
          name='name'
          value={newUser}
          onChange={(e) => setNewUser(e.target.value)}
          placeholder='Create new user ...'
        />
        <button className='button'>Create</button>
      </form>
      <ul>
        {isLoading ? (
          <div>Loading ...</div>
        ) : (
          users.map((user) => (
            <li className='box' key={`${user.id}`}>
              <UserCard user={user}/>
            </li>
          ))
        )}
      </ul>
    </main>
  )
}

export default Users
