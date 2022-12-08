import React from "react";
import { User } from "../User";
import { UserForm } from "../UserForm";

export const UserList = React.memo(function UserList({
  users,
  setUserName,
  setUpdId,
  setUsers,
  updId,
  loadTodos,
  textInput,
  userName,
}) {
  return (
    <div className="User">
      <table className="User__table table">
        <thead>
          <tr className="User__table-section tr">
            <th className="User__table-collumn th">ID</th>
            <th className="User__table-collumn th">Name</th>
            <th className="User__table-collumn th">Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map(({ id, name }) => (
            <User
              key={id + Math.random()}
              id={id}
              name={name}
              setUserName={setUserName}
              setUpdId={setUpdId}
              textInput={textInput}
              loadTodos={loadTodos}
            />
          ))}
        </tbody>
      </table>

      <UserForm
        setUpdId={setUpdId}
        textInput={textInput}
        loadTodos={loadTodos}
        setUserName={setUserName}
        userName={userName}
        updId={updId}
        setUsers={setUsers}
        users={users}
      />
    </div>
  );
});
