import { useState, Dispatch, SetStateAction, FC } from "react";
import { removeExpense } from "../../api/expenses";
import { ExpenseModal } from "../ExpenseModal/ExpenseModal";

type Props = {
  currentExpense: Expense,
  setExpenses: Dispatch<SetStateAction<Expense[]>>,
  expenses: Expense[],
};

export const ExpenseItem: FC<Props> = ({
  currentExpense,
  setExpenses,
  expenses
}) => {
  const [isUpdating, setIsUpdating] = useState(false);

  const handleDelete = async() => {
    try {
      await removeExpense(currentExpense.id);
    } catch (err: any) {
      throw new Error(err);
    }

    setExpenses(expenses.filter(expense => expense.id !== currentExpense.id));
  };

  return (
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
