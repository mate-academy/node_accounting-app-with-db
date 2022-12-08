import React from "react";
import * as expensesApi from "../../api/Expenses";

export const ExpenseForm = React.memo(function ExpenseForm({
  selectedUser,
  expInput,
  expenseName,
  setExpenseName,
  nameErr,
  expenseAmount,
  setExpenseAmount,
  amountErr,
  expenseCat,
  setExpenseCat,
  expenseNote,
  setExpenseNote,
  expUpId,
  setNameErr,
  setAmountErr,
  setExpenses,
  expenses,
  loadExpenses,
  setExpUpId,
}) {
  return (
    <form onSubmit={(event) => event.preventDefault()} className="User__form">
      <div className="field">
        <label className="label">UserID</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="id"
            disabled
            value={+selectedUser}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">Title</label>
        <div className="control">
          <input
            className="input"
            type="text"
            ref={expInput}
            placeholder="Enter title"
            value={expenseName}
            onInput={(event) => setExpenseName(event.currentTarget.value)}
          ></input>
        </div>
      </div>
      <div className="notification is-danger is-light" hidden={nameErr}>
        Title cannot be empty
      </div>

      <div className="field">
        <label className="label">Amount(UAH)</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter amount"
            value={expenseAmount}
            onInput={(event) => setExpenseAmount(event.currentTarget.value)}
          ></input>
        </div>
      </div>

      <div className="notification is-danger is-light" hidden={amountErr}>
        Amount cannot be empty
      </div>

      <div className="field">
        <label className="label">Category</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Enter category of expense"
            value={expenseCat}
            onInput={(event) => setExpenseCat(event.currentTarget.value)}
          ></input>
        </div>
      </div>
      <div className="field">
        <label className="label">Note</label>
        <div className="control">
          <input
            className="input"
            type="text"
            placeholder="Any comment"
            value={expenseNote}
            onInput={(event) => setExpenseNote(event.currentTarget.value)}
          ></input>
        </div>
      </div>

      <div className="field is-grouped">
        <button
          className="button is-primary is-rounded"
          type="button"
          disabled={expUpId !== null || expenseName === ""}
          onClick={async (event) => {
            event.preventDefault();

            if (!expenseName) {
              setNameErr(false);
            }

            if (!expenseAmount) {
              setAmountErr(false);
            }

            const newExpense = await expensesApi.addExpense(
              +selectedUser,
              expenseName,
              expenseAmount,
              expenseCat,
              expenseNote
            );

            setExpenses([...expenses, newExpense]);

            setExpenseName("");
            setExpenseCat("");
            setExpenseNote("");
            setExpenseAmount("");
            setNameErr(true);
            setAmountErr(true);
          }}
        >
          Add
        </button>
        <button
          className="button is-warning is-rounded"
          type="edit"
          disabled={expUpId === null}
          onClick={async () => {
            try {
              const updated = await expensesApi.updateExpense(
                expUpId,
                expenseName,
                expenseAmount,
                expenseCat,
                expenseNote
              );

              loadExpenses();
              setExpUpId(null);
              setExpenseName("");
              setExpenseCat("");
              setExpenseNote("");
              setExpenseAmount("");

              return updated;
            } catch (err) {
              console.log(err);
            }
          }}
        >
          Edit
        </button>
      </div>
    </form>
  );
});
