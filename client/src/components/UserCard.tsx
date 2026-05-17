import React, { FormEvent, useState } from 'react'
import { User } from '../types/User'
import { Link } from 'react-router-dom'
import { useUser } from '../context/context'
import axios from 'axios'

const UserCard: React.FC<{user: User}> = ({user}) => {
  const {deleteUser,getUsers} = useUser();
  const [isUpdated, setIsUpdated] = useState(false);
  const [newName, setNewName] = useState(user.name);

  const submit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdated(false)

    axios
    .patch(`http://localhost:8080/users/${user.id}`, {
      name: newName
    })
    .then(result => {
      getUsers();
      console.log('create user', result)
    })
    .catch(err => console.log(err))
    .finally(() => {
      setIsUpdated(false)
    })
  }
  return (
    <div className='item' style={{marginBottom: '10px'}}>
      {isUpdated
        ? (
          <form onSubmit={submit}>
            <input
              type="text"
              defaultValue={user.name}
              onChange={(e) => setNewName(e.target.value)}
              className='input'
            />
            <button className='button'>Save</button>
          </form>
        ) : (
          <h3 className="item__name">{user.name}</h3>
        )}
      <button onClick={() => setIsUpdated(!isUpdated)} className='item__btn'>Update</button>
      <button
        className='item__btn has-text-danger'
        onClick={() => deleteUser(+user.id)}
      >Delete</button>
      <Link to={`expenses?userId=${user.id}`}>Show Expenses</Link>
    </div>
  )
}

export default UserCard
