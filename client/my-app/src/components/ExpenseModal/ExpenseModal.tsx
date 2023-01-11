import { useState, Dispatch, SetStateAction, FC } from "react";
import { patchExpense } from "../../api/expenses";
import { detectType } from '../NewExpenseForm'

type Props = {
  expense: Expense,
  onClose: Dispatch<SetStateAction<boolean>>,
};

export const ExpenseModal: FC<Props> = ({ expense, onClose }) => {
  const [dataForUpdate, setDataForUpdate] = useState({
    title: expense.title,
    amount: expense.amount,
    category: expense.category,
    spentAt: expense.spentAt,
    note: expense.note || '',
  });

  const handleSubmit = async() => {
    try {
      await patchExpense(expense.id, dataForUpdate);
    } catch (err: any) {
      throw new Error(err);
    }

    onClose(false);
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

            <button
              type="button"
              className="delete"
              onClick={() => onClose(false)}
            />
          </header>

          <div className="modal-card-body">
            <form onSubmit={handleSubmit}>
              {Object.entries(dataForUpdate).map(([key, value]) => (
                <input
                  key={key}
                  type={detectType(key)}
                  value={value}
                  onChange={e => setDataForUpdate({
                    ...dataForUpdate,
                    [key]: e.target.value,
                  })}
                />
              ))}

              <button type="submit">Submit</button>
            </form>
          </div>
        </div>
    </div>
  );
};
