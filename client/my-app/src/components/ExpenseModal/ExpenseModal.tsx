import {
  useState,
  Dispatch,
  SetStateAction,
  FC,
  useMemo,
  useCallback,
  useContext
} from "react";

import { patchExpense } from "../../api/expenses";
import { ErrorContext } from "../../Contexts/ErrorContext";
import { detectType } from '../NewExpenseForm'

type Props = {
  expense: Expense,
  setIsUpdating: Dispatch<SetStateAction<boolean>>,
};

export const ExpenseModal: FC<Props> = ({ expense, setIsUpdating }) => {
  const { id, title, amount, category, spentAt, note = ''} = useMemo(
    () => expense,
    [expense]
  );

  const [dataForUpdate, setDataForUpdate] = useState({
    title,
    amount,
    category,
    spentAt,
    note
  });

  const { setErrorMessage } = useContext(ErrorContext);

  const handleSubmit = useCallback(async() => {
    try {
      await patchExpense(id, dataForUpdate);
    } catch (err: any) {
      setErrorMessage('Error on expense updating');
    }

    setIsUpdating(false);
  }, [dataForUpdate, id, setErrorMessage, setIsUpdating]);

  return (
    <div className="modal is-active">
      <div className="modal-background" />
        <div className="modal-card">
          <header className="modal-card-head">
            <div className="modal-card-title has-text-weight-medium">
              Expense #
              {id}
            </div>

            <button
              type="button"
              className="delete"
              onClick={() => setIsUpdating(false)}
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
