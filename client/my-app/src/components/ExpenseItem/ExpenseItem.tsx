import React, { useState } from "react";
import { removeExpense } from "../../api/expenses";
import { Expense } from "../../types/Expense";
import { ExpenseModal } from "../ExpenseModal/ExpenseModal";

type Props = {
  currentExpense: Expense,
  setExpenses: React.Dispatch<React.SetStateAction<Expense[]>>,
  expenses: Expense[],
};

export const ExpenseItem: React.FC<Props> = ({
  currentExpense,
  setExpenses,
  expenses
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = () => {
    removeExpense(currentExpense.id)
      .then(() => setExpenses(expenses.filter(
        expense => expense.id !== currentExpense.id
      )));
  };

  return(
    <>
      <li className="section">
        <p className="expense-text">
          {JSON.stringify(currentExpense, null, 2)}
        </p>
        <button className="delete" onClick={handleDelete}></button>
        <button className="button" onClick={() => setIsUpdating(true)}>
          Update
        </button>
      </li>

      {isUpdating && (
        <ExpenseModal expense={currentExpense} onClose={setIsUpdating} />
      )}
    </>
  );
};
