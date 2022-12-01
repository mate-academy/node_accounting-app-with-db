import React from "react";
import * as usersAPI from '../../api/Users';

export const User = React.memo(function User({id, name, setUserName, setUpdId, textInput, loadTodos}) {
  return (
    <tr className="User__table-section tr">
      <th className="User__table-collumn td">{id}</th>
      <td className="User__table-collumn td">{name}</td>
      <td className="User__table-collumn td">
        <button
          className="User__table-button button is-warning is-rounded"
          onClick={() => {
            setUserName(name);
            setUpdId(id);
            textInput.current.focus();
          }}
        >
          Edit
        </button>

        <button
          className="User__table-button button is-danger is-rounded"
          onClick={async () => {
            await usersAPI.removeUser(id);
            loadTodos();
          }}
        >
          {" "}
          Delete
        </button>
      </td>
    </tr>
  );
});
