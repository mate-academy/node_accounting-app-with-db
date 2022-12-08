import React from "react";
import * as expensesApi from "../../api/Expenses";

export const Expense = React.memo(function Expense({
  id,
  createdAt,
  name,
  amount,
  category,
  note,
  setSelecteduser,
  selectedUser,
  setExpenseName,
  setExpenseAmount,
  setExpenseCat,
  setExpenseNote,
  setExpUpId,
  expInput,
  loadExpenses,
}) {
  return (
    <tr className="User__table-section tr">
      <th className="User__table-collumn td">{id}</th>
      <td className="User__table-collumn td">{createdAt.split(".")[0]}</td>
      <td className="User__table-collumn td">{name}</td>
      <td className="User__table-collumn td">{amount}</td>
      <td className="User__table-collumn td">{category}</td>
      <td className="User__table-collumn td">{note}</td>
      <td className="User__table-collumn td">
        <button
          className="User__table-button button is-warning is-rounded"
          onClick={() => {
            setSelecteduser(selectedUser);
            setExpenseName(name);
            setExpenseAmount(amount);
            setExpenseCat(category);
            setExpenseNote(note);
            setExpUpId(id);
            expInput.current.focus();
          }}
        >
          Edit
        </button>

        <button
          className="User__table-button button is-danger is-rounded"
          onClick={async () => {
            await expensesApi.removeExpense(id);
            loadExpenses();
          }}
        >
          {" "}
          Delete
        </button>
      </td>
    </tr>
  );
});
