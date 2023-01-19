import { useContext, useEffect, useState } from "react";
import { getExpenses } from "../../api/expenses";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { RefreshExpensesContext } from "../../Contexts/RefreshExpensesContext";
import { SelectedUserContext } from "../../Contexts/SelectedUserContext";
import { AddExpenseSection } from "../AddExpenseSection";
import { ExpenseItem } from "../ExpenseItem";

export const Expenses = () => {
  const { selectedUserId } = useContext(SelectedUserContext);
  const { changeCount } = useContext(RefreshExpensesContext);
  const { setErrorMessage } = useContext(ErrorContext);

  const [category, setCategory] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  useEffect(() => {
    const fetchExpenses = async() => {
      try {
        const fetchedExpenses = await getExpenses({
          userId: selectedUserId,
          category,
          from,
          to
        });

        setExpenses(fetchedExpenses);
      } catch (err: any) {
        setErrorMessage('Error while fetching expenses');
      }
    };

    fetchExpenses();
  }, [category, from, selectedUserId, to, changeCount, setErrorMessage]);

  return (
    <div className="column">
      <form>
        <div className="label center">
          Filter:
        </div>

        <p className="level-item">
          <label className="label">
            Category:
          </label>
          <input
            className="input"
            type="text"
            value={category}
            onChange={e => setCategory(e.target.value)}
          />
        </p>

        <p className="level-item">
          <label className="label">
            From:
          </label>
          <input
            className="input"
            type="text"
            value={from}
            onChange={e => setFrom(e.target.value)}
          />
        </p>

        <p className="level-item">
          <label className="label">
            To:
          </label>
          <input
            className="input"
            type="text"
            value={to}
            onChange={e => setTo(e.target.value)}
          />
        </p>
      </form>

      <AddExpenseSection />

      <ul className="box">
        {expenses.map(expense => (
          <ExpenseItem
            key={expense.id}
            currentExpense={expense}
            setExpenses={setExpenses}
            expenses={expenses}
          />
        ))}
      </ul>
    </div>
  );
};
