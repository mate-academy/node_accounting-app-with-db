import {
  useState,
  Dispatch,
  SetStateAction,
  FC,
  useCallback,
  useContext
} from "react";

import { removeExpense } from "../../api/expenses";
import { ErrorContext } from "../../Contexts/ErrorContext";
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

  const { setErrorMessage } = useContext(ErrorContext);

  const handleDelete = useCallback(async() => {
    try {
      await removeExpense(currentExpense.id);
    } catch (err: any) {
      setErrorMessage('Error on expense deleting');
    }

    setExpenses(expenses.filter(expense => expense.id !== currentExpense.id));
  }, [currentExpense.id, expenses, setErrorMessage, setExpenses]);

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
        <ExpenseModal expense={currentExpense} setIsUpdating={setIsUpdating} />
      )}
    </>
  );
};
