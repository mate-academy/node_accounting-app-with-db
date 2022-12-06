import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import * as usersAPI from "./api/Users";
import * as expensesApi from "./api/Expenses";
import { UserList } from "./components/UserList";
import { ExpenseSelector } from "./components/ExpenseSelector";

function App() {
  const [users, setUsers] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [userName, setUserName] = useState("");
  const [updId, setUpdId] = useState(null);
  const [selectedUser, setSelecteduser] = useState(null);
  const textInput = useRef(null);
  const expInput = useRef(null);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(null);
  const [expenseCat, setExpenseCat] = useState("");
  const [expenseNote, setExpenseNote] = useState("");
  const [expUpId, setExpUpId] = useState(null);
  const [nameErr, setNameErr] = useState(true);
  const [amountErr, setAmountErr] = useState(true);

  const loadUsers = () => {
    usersAPI.getAll().then(setUsers);
  };

  const loadExpenses = () => {
    expensesApi.getAll().then(setExpenses);
  };

  useEffect(() => {
    loadUsers();
    loadExpenses();
    textInput.current.focus();
  }, [selectedUser]);

  return (
    <>
      <h1 className="User__header">User table</h1>
      <UserList
        users={users}
        setUserName={setUserName}
        setUpdId={setUpdId}
        setUsers={setUsers}
        updId={updId}
        loadTodos={loadUsers}
        textInput={textInput}
        userName={userName}
      />

      <ExpenseSelector
        setSelecteduser={setSelecteduser}
        users={users}
        selectedUser={+selectedUser}
      />

      <div className="Expense">
        {selectedUser && (
          <>
            <table className="table User__table">
              <thead>
                <tr className="tr">
                  <th className="th">ID</th>
                  <th className="th">SpentAt</th>
                  <th className="th">Title</th>
                  <th className="th">Amount(UAH)</th>
                  <th className="th">Category</th>
                  <th className="th">Note</th>
                </tr>
              </thead>
              <tbody>
                {expenses &&
                  expenses
                    .filter((expense) => expense.user_id === +selectedUser)
                    .map(({ id, createdAt, name, amount, category, note }) => (
                      <tr
                        className="User__table-section tr"
                        key={id + Math.random()}
                      >
                        <th className="User__table-collumn td">{id}</th>
                        <td className="User__table-collumn td">
                          {createdAt.split(".")[0]}
                        </td>
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
                    ))}
              </tbody>
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
                    onInput={(event) =>
                      setExpenseName(event.currentTarget.value)
                    }
                  ></input>
                </div>
              </div>
                <div class="notification is-danger is-light" hidden={nameErr}>
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
                    onInput={(event) =>
                      setExpenseAmount(event.currentTarget.value)
                    }
                  ></input>
                </div>
              </div>

                <div class="notification is-danger is-light" hidden={amountErr}>
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
                    onInput={(event) =>
                      setExpenseCat(event.currentTarget.value)
                    }
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
                    onInput={(event) =>
                      setExpenseNote(event.currentTarget.value)
                    }
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
          </>
        )}
      </div>
    </>
  );
}

export default App;
