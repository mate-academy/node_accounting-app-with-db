import React, { useState } from "react";
import { patchExpense } from "../../api/expenses";
import { Expense } from "../../types/Expense";

type Props = {
  expense: Expense,
  onClose: React.Dispatch<React.SetStateAction<boolean>>,
};

export const ExpenseModal: React.FC<Props> = ({ expense, onClose }) => {
  const [title, setTitle] = useState(expense.title);
  const [amount, setAmount] = useState(expense.amount);
  const [category, setCategory] = useState(expense.category);
  const [spentAt, setSpentAt] = useState(expense.spentAt);
  const [note, setNote] = useState(expense.note || '');

  const handleSubmit = () => {
    patchExpense(expense.id, { title, amount, category, spentAt, note })
      .then(() => onClose(false));
  };

  return (
    <div className="modal is-active">
      <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Expense #
              {expense.id}
            </div>

            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <button
              type="button"
              className="delete"
              onClick={() => onClose(false)}
            />
          </header>

          <div className="modal-card-body">
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                value={title}
                onChange={e => setTitle(e.target.value)}
              />
              <input
                type="number"
                value={amount}
                onChange={e => setAmount(+e.target.value)}
              />
              <input
                type="text"
                value={category}
                onChange={e => setCategory(e.target.value)}
              />
              <input
                type="text"
                value={spentAt}
                onChange={e => setSpentAt(e.target.value)}
              />
              <input
                type="text"
                value={note}
                onChange={e => setNote(e.target.value)}
              />

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    </div>
  );
};
