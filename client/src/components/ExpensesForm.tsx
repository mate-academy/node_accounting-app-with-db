import { useEffect, useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { postExpense } from '../api/Expenses';
import { getUsers } from '../api/Users';
import { User } from '../types/User';

type Props = {
  setHasModal: (value: boolean) => void;
};

export const ExpensesForm: React.FC<Props> = ({ setHasModal }) => {
  const normalizeDateForDb = (formDate: string) => {
    const normalized = new Date(formDate).toJSON();

    return normalized;
  };

  const [user, setUser] = useState('');
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [amount, setAmount] = useState('');
  const [date, setDate] = useState(normalizeDateForDb(new Date().toJSON()));
  const [note, setNote] = useState('');
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const handleFormSubmit = () => {
    postExpense({
      userId: user,
      spentAt: normalizeDateForDb(date),
      title,
      amount: +amount,
      category,
      note,
    });
  };

  return (
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
            value={date}
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
  );
};
