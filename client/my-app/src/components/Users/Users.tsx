import React, { useEffect, useState, useContext } from "react";
import { addUser, getUsers } from '../../api/users';
import { UserItem } from "../UserItem";
import { UsersContext } from "../../UsersContext";

export const Users = () => {
  const { users, setUsers } = useContext(UsersContext);

  const [newUserName, setNewUserName] = useState('');
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    getUsers()
      .then(setUsers)
  }, [changeCount, setUsers]);

  const handleSubmit = () => {
    addUser(newUserName)
      .then(user => {
        setUsers([...users, user]);
        setNewUserName('');
      });
  };

  return (
    <div className="column">
      <form className="level">
        <p className="level-item">
          <input
            className="input"
            type="text"
            value={newUserName}
            onChange={e => setNewUserName(e.target.value)}
          />

          <button
            className="button"
            type="button"
            onClick={handleSubmit}
          >
            Add new user
          </button>
        </p>
      </form>

      <ul className="box">
        {users.map(user => (
          <UserItem
            key={user.id}
            user={user}
            changeCount={changeCount}
            update={setChangeCount}
          />
        ))}
      </ul>
    </div>
  );
};
