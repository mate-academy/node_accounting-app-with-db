import "./App.css";
import React, { useEffect, useState, useRef } from "react";
import * as usersAPI from "./api/Users";
import * as expensesApi from "./api/Expenses";
import { UserList } from "./components/UserList";
import { ExpenseSelector } from "./components/ExpenseSelector";
import { ExpenseList } from "./components/ExpenseList";

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

  const loadUsers = async () => {
    usersAPI.getAll().then(setUsers);
  };

  const loadExpenses = async () => {
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

      <ExpenseList
        selectedUser={selectedUser}
        expenses={expenses}
        setSelecteduser={setSelecteduser}
        setExpenseName={setExpenseName}
        setExpenseAmount={setExpenseAmount}
        setExpenseCat={setExpenseCat}
        setExpenseNote={setExpenseNote}
        setExpUpId={setExpUpId}
        expInput={expInput}
        loadExpenses={loadExpenses}
        expenseName={expenseName}
        nameErr={nameErr}
        expenseAmount={expenseAmount}
        expenseCat={expenseCat}
        amountErr={amountErr}
        expenseNote={expenseNote}
        expUpId={expUpId}
        setNameErr={setNameErr}
        setAmountErr={setAmountErr}
        setExpenses={setExpenses}
      />
    </>
  );
}

export default App;
