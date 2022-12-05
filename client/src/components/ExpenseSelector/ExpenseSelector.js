import React, { useState } from "react";

export const ExpenseSelector = React.memo(function ExpenseSelector({
  setSelecteduser,
  users,
  selectedUser,
}) {

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="Expense__header">
      {" "}
      <h2>Choose your user</h2>
      <div className="select is-small is-rounded">
        <select
          className="Expense__header-select"
          name="users"
          value={selectedUser}
          onChange={(event) => {
            setSelecteduser(event.target.value);
            setIsOpen(true);
          }}
        >
          <option value='Choose one' disabled={isOpen}>
            Choose one
          </option>
          {users.map(({ name, id }) => {
            return (
              <option key={id} value={id}>
                {name}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
});
