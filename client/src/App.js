import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import * as usersAPI from "./api/Users";
import { UserList } from './components/UserList'

function App() {
  const [users, setUsers] = useState([]);
  const [userName, setUserName] = useState("");
  const [updId, setUpdId] = useState(null);
  const [selectedUser, setSelecteduser] = useState(null);
  const textInput = useRef(null);

  const loadTodos = () => {
    usersAPI.getAll().then(setUsers);
  };

  useEffect(() => {
    loadTodos();
    textInput.current.focus();
  }, []);

  return (
    <>
      <h1 className="User__header">User table</h1>
      <UserList 
        users={users}
        setUserName={setUserName}
        setUpdId={setUpdId}
        setUsers={setUsers}
        updId={updId}
        loadTodos={loadTodos}
        textInput={textInput}
        userName={userName}
      />

      <div className="Expense__header"> Choose your user 
      <select 
      className="Expense__header-select"
        name="users"
        defaultValue='set user'
        onChange={(event) => {
          setSelecteduser(event.target.value)
        }  }
      >
        {users.map(({ name, id }) => {
          return (
            <option key={id} value={id}>
              {name}
            </option>
          );
        })}
      </select>
      </div>

      <div className="Expense"> 
      {selectedUser && 
        <>
          <table className="table User__table">
            <thead>
              <tr className="tr">
                <th className="th">ID</th>
                <th className="th">SpentAt</th>
                <th className="th">Title</th>
                <th className="th">Amount</th>
                <th className="th">Category</th>
                <th className="th">Note</th>
              </tr>
            </thead>
          </table>
          <form
            onSubmit={(event) => event.preventDefault()}
            className="User__form"
          >
            <div className="field">
                <label className="label">UserID</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    disabled
                    placeholder={selectedUser}
                  ></input>
                </div>
            </div>
            <div className="field">
              <label className="label">Title</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    // ref={textInput}
                    placeholder="Enter title"
                    >
                  </input>
                </div>
            </div>
            <div className="field">
              <label className="label">Amount</label>
                <div className="control">
                  <input
                    className="input"
                    type="number"
                    // ref={textInput}
                    placeholder="Enter amount"
                    >
                  </input>
                </div>
            </div>
            <div className="field">
              <label className="label">Category</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    // ref={textInput}
                    placeholder="Enter category of expense"
                    >
                  </input>
                </div>
            </div>
            <div className="field">
              <label className="label">Note</label>
                <div className="control">
                  <input
                    className="input"
                    type="text"
                    // ref={textInput}
                    placeholder="Any comment"
                    >
                  </input>
                </div>
            </div>

              <div className="field is-grouped">
                <button
                  className="button is-primary is-rounded"
                  type="button"
                  disabled={updId !== null}
                  onClick={async (event) => {
                    event.preventDefault();

                    const newUser = await usersAPI.addUser(userName);

                    setUsers([...users, newUser]);

                    setUserName("");
                  } }
                >
                  Add
                </button>
                <button
                  className="button is-warning is-rounded"
                  type="edit"
                  disabled={updId === null}
                  onClick={() => {
                    usersAPI.updateUser(updId, userName).then(loadTodos);

                    setUpdId(null);
                    setUserName("");
                  } }
                >
                  Edit
                </button>
              </div>
            </form>
        </>
      }

      </div>
    </>
  );
}

export default App;
