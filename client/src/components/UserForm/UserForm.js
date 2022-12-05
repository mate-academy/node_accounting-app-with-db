import React from "react";
import * as usersAPI from "../../api/Users";

export const UserForm = React.memo(function UserForm({
  textInput,
  userName,
  setUserName,
  updId,
  setUsers,
  users,
  loadTodos,
  setUpdId,
}) {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="User__form">
      <div className="field">
        <label className="label">Name</label>
        <div className="control">
          <input
            className="input"
            type="text"
            ref={textInput}
            placeholder="Enter name"
            value={userName}
            onInput={(event) => setUserName(event.currentTarget.value)}
          ></input>
        </div>
      </div>

      <div className="field is-grouped">
        <button
          className="button is-primary is-rounded"
          type="button"
          disabled={updId !== null || userName === ''}
          onClick={async (event) => {
            event.preventDefault();

            const newUser = await usersAPI.addUser(userName);

            setUsers([...users, newUser]);

            setUserName("");
          }}
        >
          Add
        </button>
        <button
          className="button is-warning is-rounded"
          type="edit"
          disabled={updId === null}
          onClick={async () => {
            try {
              const updated = await usersAPI.updateUser(updId, userName);

              loadTodos();
              setUpdId(null);
              setUserName("");

              return updated;
            } catch(err) {
              console.log(err)
            }
          }}
        >
          Edit
        </button>
      </div>
    </form>
  );
});
