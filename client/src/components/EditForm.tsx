import { useEffect, useState } from 'react';
import { Button, Form, Loader } from 'react-bulma-components';
import { getExpense, patchExpense } from '../api/Expenses';
import { getUsers } from '../api/Users';
import { Expense } from '../types/Expense';
import { User } from '../types/User';

type Props = {
  setHasModal: (value: boolean) => void;
  selectedExpenseId: string;
};

export const EditForm: React.FC<Props> = ({
  setHasModal,
  selectedExpenseId,
}) => {
  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState('');
  const [note, setNote] = useState('');
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
      setIsLoading(false);
    });

    getExpense(selectedExpenseId).then((res: Expense) => {
      setUser(res.userId);
      setTitle(res.title);
      setCategory(res.category);
      setAmount(res.amount.toString());
      setDate(res.spentAt);
      setNote(res.note);
    });
  }, []);

  const normalizeDateForDb = (formDate: string) => {
    const normalized = new Date(formDate).toJSON();

    return normalized;
  };

  const normalizeDateForInput = (ISOdate: string) => {
    const normalized = new Date(ISOdate)
      .toLocaleString('sv')
      .replace(' ', 'T')
      .slice(0, -3);

    return normalized;
  };

  const handleFormSubmit = () => {
    patchExpense(selectedExpenseId , {
      userId: user,
      spentAt: normalizeDateForDb(date),
      title,
      amount: +amount,
      category,
      note,
    });
  };

  return (
    <>
      {isLoading && <Loader className="mx-auto is-size-1 mt-5" />}

      {!isLoading && (
        <form onSubmit={handleFormSubmit}>
          <Form.Field>
            <Form.Label>User</Form.Label>
            <Form.Field>
              <Form.Control>
                <Form.Select
                  value={user}
                  className="is-fullwidth"
                  onChange={(event) => {
                    setUser(event.target.value);
                  }}
                  required
                >
                  <option value="" disabled key={0}>
                    Select user
                  </option>
                  {users.map((category) => (
                    <option value={category.id} key={category.id}>
                      {category.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Control>
            </Form.Field>
          </Form.Field>
          <Form.Field>
            <Form.Label>Title</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Category</Form.Label>
            <Form.Control>
              <Form.Input
                type="text"
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Amount</Form.Label>
            <Form.Control>
              <Form.Input
                type="number"
                min="0"
                value={amount}
                onChange={(event) => setAmount(event.target.value)}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Date</Form.Label>
            <Form.Control>
              <Form.Input
                type="datetime-local"
                value={normalizeDateForInput(date)}
                onChange={(event) => {
                  setDate(event.target.value.toString());
                }}
                required
              />
            </Form.Control>
          </Form.Field>
          <Form.Field>
            <Form.Label>Note</Form.Label>
            <Form.Textarea
              value={note}
              rows={1}
              onChange={(event) => setNote(event.target.value)}
            />
          </Form.Field>
          <Form.Field kind="group">
            <Form.Control>
              <Button color="success" type="submit">
                Save
              </Button>
            </Form.Control>
            <Form.Control>
              <Button
                color="link"
                colorVariant="light"
                onClick={() => {
                  setHasModal(false);
                }}
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
