import { useEffect, useState, useContext, useCallback } from "react";
import { addUser, getUsers } from '../../api/users';
import { UserItem } from "../UserItem";
import { UsersContext } from "../../Contexts/UsersContext";
import { ErrorContext } from "../../Contexts/ErrorContext";

export const Users = () => {
  const { users, setUsers } = useContext(UsersContext);
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  const [newUserName, setNewUserName] = useState('');
  const [changeCount, setChangeCount] = useState(0);

  useEffect(() => {
    const fetchUsers = async() => {
      try {
        const fetchedUsers = await getUsers();

        setUsers(fetchedUsers);
      } catch (err: any) {
        setErrorMessage('Error while fetching users');
      }
    };

    fetchUsers();
  }, [changeCount, setUsers]);

  const handleSubmit = useCallback(async() => {
    try {
      const user = await addUser(newUserName);

      setUsers([...users, user]);
    } catch (err: any) {
      setErrorMessage('Error on adding a new user');
    }

    setNewUserName('');
  }, [newUserName, setUsers, users]);

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
