import React from "react";
import { Expense } from "../Expense/Expense";
import { ExpenseForm } from "../ExpenseForm";

export const ExpenseList = React.memo(function ExpenseList({
  selectedUser,
  expenses,
  setSelecteduser,
  setExpenseName,
  setExpenseAmount,
  setExpenseCat,
  setExpenseNote,
  setExpUpId,
  expInput,
  loadExpenses,
  expenseName,
  nameErr,
  expenseAmount,
  expenseCat,
  amountErr,
  expenseNote,
  expUpId,
  setNameErr,
  setAmountErr,
  setExpenses,
}) {
  return (
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
                    <Expense
                      key={id + Math.random()}
                      id={id}
                      createdAt={createdAt}
                      name={name}
                      amount={amount}
                      category={category}
                      note={note}
                      setSelecteduser={setSelecteduser}
                      selectedUser={selectedUser}
                      setExpenseName={setExpenseName}
                      setExpenseAmount={setExpenseAmount}
                      setExpenseCat={setExpenseCat}
                      setExpenseNote={setExpenseNote}
                      setExpUpId={setExpUpId}
                      expInput={expInput}
                      loadExpenses={loadExpenses}
                    />
                  ))}
            </tbody>
          </table>
          <ExpenseForm
            selectedUser={selectedUser}
            expInput={expInput}
            expenseName={expenseName}
            setExpenseName={setExpenseName}
            nameErr={nameErr}
            expenseAmount={expenseAmount}
            setExpenseAmount={setExpenseAmount}
            amountErr={amountErr}
            expenseCat={expenseCat}
            setExpenseCat={setExpenseCat}
            expenseNote={expenseNote}
            setExpenseNote={setExpenseNote}
            expUpId={expUpId}
            setNameErr={setNameErr}
            setAmountErr={setAmountErr}
            setExpenses={setExpenses}
            expenses={expenses}
            loadExpenses={loadExpenses}
            setExpUpId={setExpUpId}
          />
        </>
      )}
    </div>
  );
});
