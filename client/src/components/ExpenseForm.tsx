import { FormEvent, useEffect, useState } from 'react';
import { Button, Form, Loader } from 'react-bulma-components';

import { addExpense, getExpenseById, patchExpense } from '../api/expenses';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { fetchExpenses } from '../redux/slices/expenseSlice';
import { setModalState } from '../redux/slices/modalSlice';
import { IExpense } from '../types/Expense.interface';

const normalizeDateForDb = (formDate: string) => {
  const normalized = new Date(formDate).toJSON();

  return normalized;
};

const normalizeDateForInput = (ISOdate: string) => {
  const normalized = new Date(ISOdate)
    .toLocaleString("sv")
    .replace(' ', 'T')
    .slice(0, -3);

  return normalized;
};

const ExpenseForm: React.FC = () => {
  const { variant } = useAppSelector(state => state.modal);
  const { currentExpenseId } = useAppSelector(state => state.expense);

  const [ currentExpense, setCurrentExpense ] = useState<IExpense | null>(null);

  const [formUser, setFormUser] = useState('');
  const [formTitle, setFormTitle] = useState('');
  const [formAmount, setFormAmount] = useState(0);
  const [formCategory, setFormCategory] = useState('');
  const [formDate, setFormDate] = useState(
    normalizeDateForDb(new Date().toJSON())
  );
  const [formNote, setFormNote] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const dispatch = useAppDispatch();

  const handleFormSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsProcessing(true);

    if (variant === 'new') {
      addExpense({
        user: formUser,
        title: formTitle,
        category: formCategory,
        amount: formAmount,
        date: formDate,
        note: formNote,
      })
        .then(() => {
          dispatch(setModalState({ variant: null }));
          dispatch(fetchExpenses());
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }

    if (variant === 'edit') {
      if (!currentExpense) {
        setIsProcessing(false);

        return;
      }

      patchExpense({
        id: currentExpense.id,
        user: formUser,
        title: formTitle,
        category: formCategory,
        amount: formAmount,
        date: formDate,
        note: formNote,
      })
        .then(() => {
          dispatch(setModalState({ variant: null }));
          dispatch(fetchExpenses());
        })
        .catch(() => {
          setIsProcessing(false);
        });
    }
  }

  const handleCancel = () => {
    dispatch(setModalState({ variant: null }));
  };

  useEffect(() => {
    if (!currentExpenseId) {
      return;
    }

    setIsLoading(true);

    getExpenseById(currentExpenseId)
      .then(result => setCurrentExpense(result))
      .finally(() => setIsLoading(false));
  }, [currentExpenseId]);

  useEffect(() => {
    if (!currentExpense) {
      return;
    }

    const {
      user,
      title,
      category,
      amount,
      date,
      note,
    } = currentExpense;

    setFormUser(user);
    setFormTitle(title);
    setFormCategory(category);
    setFormAmount(amount);
    setFormDate(date);
    setFormNote(note);
  }, [currentExpense]);

  return (
    <>
      {isLoading && <Loader className="mx-auto is-size-1" />}
      {!isLoading && (
        <form onSubmit={handleFormSubmit}>
        <Form.Field>
          <Form.Label>User</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              value={formUser}
              onChange={(e) => {
                return setFormUser(e.target.value);
              }}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Title</Form.Label>
          <Form.Control>
            <Form.Input
              type="text"
              value={formTitle}
              onChange={(e) => {
                return setFormTitle(e.target.value);
              }}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Category</Form.Label>
          <Form.Field>
            <Form.Control>
              <Form.Select
                value={formCategory}
                className="is-fullwidth"
                onChange={(e) => {
                  return setFormCategory(e.target.value);
                }}
                required
              >
                <option value="" disabled key={0}>Select category</option>
                {
                  [
                    'Food',
                    'Entertainment',
                    'Transport',
                    'Sport',
                    'Healthcare',
                    'Pets',
                    'Household',
                    'Charity',
                    'Travel',
                    'Shopping',
                  ].map(category => (
                    <option
                      value={category}
                      key={category}
                    >
                      {category}
                    </option>
                  ))
                }
              </Form.Select>
            </Form.Control>
          </Form.Field>
        </Form.Field>

        <Form.Field>
          <Form.Label>Amount</Form.Label>
          <Form.Control>
            <Form.Input
              type="number"
              min="0"
              value={formAmount}
              onChange={(e) => {
                return setFormAmount(+e.target.value);
              }}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Date</Form.Label>
          <Form.Control>
            <Form.Input
              type="datetime-local"
              value={normalizeDateForInput(formDate)}
              onChange={(e) => {
                const newDate = normalizeDateForDb(new Date(e.target.value).toJSON());

                return setFormDate(newDate);
              }}
              required
            />
          </Form.Control>
        </Form.Field>

        <Form.Field>
          <Form.Label>Note</Form.Label>
          <Form.Textarea
            value={formNote}
            rows={1}
            onChange={(e) => {
              return setFormNote(e.target.value);
            }}
          />
        </Form.Field>

        <Form.Field kind="group">
          <Form.Control>
            <Button
              color="success"
              type="submit"
              loading={isProcessing}
            >
              Save
            </Button>
          </Form.Control>
          <Form.Control>
            <Button
              color="link"
              colorVariant="light"
              onClick={handleCancel}
              disabled={isProcessing}
            >
              Cancel
            </Button>
          </Form.Control>
        </Form.Field>
      </form>
      )}
    </>
  );
};

export default ExpenseForm;
