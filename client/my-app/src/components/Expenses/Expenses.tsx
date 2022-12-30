import { useContext, useEffect, useState } from "react";
import { getExpenses } from "../../api/expenses";
import { SelectedUserContext } from "../../SelectedUserContext";
import { Expense } from '../../types/Expense'
import { AddExpenseForm } from "../AddExpenseForm";
import { ExpenseItem } from "../ExpenseItem";

export const Expenses = () => {
  const { selectedUserId } = useContext(SelectedUserContext);

  const [category, setCategory] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [expenses, setExpenses] = useState<Expense[]>([]);

  const [changeCount, setChangeCount] = useState(0);


  useEffect(() => {
    getExpenses({
      userId: selectedUserId,
      category,
      from,
      to
    })
      .then(setExpenses);
  }, [category, from, selectedUserId, to, changeCount]);

  return(
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

      <AddExpenseForm
        changeCount={changeCount}
        setChangeCount={setChangeCount}
      />

      <ul className="box">
        {expenses.map(expense => {
          return (
            <ExpenseItem
              key={expense.id}
              currentExpense={expense}
              setExpenses={setExpenses}
              expenses={expenses}
            />
          )
        })}
      </ul>
    </div>
  );
}
