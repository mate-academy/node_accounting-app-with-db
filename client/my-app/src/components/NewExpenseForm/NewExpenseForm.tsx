import { useContext, FormEvent, useState, FC } from 'react';
import { UsersContext } from '../../Contexts/UsersContext';
import { addExpense } from "../../api/expenses";
import { RefreshExpensesContext } from '../../Contexts/RefreshExpensesContext';
import { REQUIRED_FIELDS } from '../../constants'

export const detectType = (str: string) => {
  switch (str) {
    case 'amount':
      return 'number';

    case 'date':
      return 'date';

    default:
      return 'text';
  }
};

type Props = {
  closeTheForm: (value: boolean) => void;
};

export const NewExpenseForm: FC<Props> = ({ closeTheForm }) => {
  const { users } = useContext(UsersContext);
  const { changeCount, setChangeCount } = useContext(RefreshExpensesContext);

  const [userId, setUserId] = useState(0);

  const [dataForAdd, setDataForAdd] = useState({
    title: '',
    amount: 0,
    date: '',
    category: '',
    note: '',
  });

  const handleSubmit = async(e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await addExpense({
        userId,
        ...dataForAdd,
      });

      resetForm();
    } catch (err: any) {
      throw new Error(err);
    }
  };

  const resetForm = () => {
    closeTheForm(false);

    setUserId(0);
    setDataForAdd({
      title: '',
      amount: 0,
      date: '',
      category: '',
      note: '',
    });

    setChangeCount(changeCount + 1);
  };

  const capitalize = (str: string) => {
    return str[0].toUpperCase() + str.slice(1)
  };

  const isRequired = (key: string) => {
    return REQUIRED_FIELDS.includes(key);
  };



  return (
    <form className="box" onSubmit={handleSubmit}>
      <h2 className="title">Add new expense</h2>
      <button
        type="button"
        className="button"
        onClick={() => closeTheForm(false)}
      >
        Close
      </button>

      <label className="label">User</label>
      <select
        className="select"
        value={userId}
        onChange={e => setUserId(+e.target.value)}
      >
        <option value="0"></option>
        {users.map(user => (
          <option key={user.id} value={user.id}>
            {user.name}
          </option>
        ))}
      </select>

      {Object.entries(dataForAdd).map(([key, value]) => (
        <label className="label">
          {capitalize(key)}
          <input
            className="input"
            key={key}
            type={detectType(key)}
            value={value}
            onChange={e => setDataForAdd({
              ...dataForAdd,
              [key]: e.target.value,
            })}
            required={isRequired(key)}
          />
        </label>
      ))}

      <button
        className="button"
        type="submit"
      >
        Submit
      </button>
    </form>
  );
};
