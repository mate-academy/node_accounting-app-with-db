import { useState } from 'react';
import { Button, Form } from 'react-bulma-components';
import { IExpense } from '../types/IExpense';

type TProps = {
  currentExpense: IExpense | null;
};

const normalizeDate = (ISODate: string) => ISODate.slice(0, -8);

const ExpenseForm: React.FC<TProps> = ({ currentExpense }) => {
  const {
    // id = '',
    user,
    title,
    category,
    amount,
    date,
    note,
  } = currentExpense || {};

  const [formUser, setFormUser] = useState(user || '');
  const [formTitle, setFormTitle] = useState(title || '');
  const [formAmount, setFormAmount] = useState(amount || 0);
  const [formCategory, setFormCategory] = useState(category || '');
  const [formDate, setFormDate] = useState(date || new Date().toISOString());
  const [formNote, setFormNote] = useState(note || '');

  return (
    <form>
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
            >
              <option value="">Select category</option>
              <option value="with-options">With options</option>
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
            value={normalizeDate(formDate)}
            onChange={(e) => {
              const newDate = (new Date(e.target.value)).toISOString();

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
          <Button color="success">Save</Button>
        </Form.Control>
        <Form.Control>
          <Button color="link" colorVariant="light">
            Cancel
          </Button>
        </Form.Control>
      </Form.Field>
    </form>
  );
};

export default ExpenseForm;
