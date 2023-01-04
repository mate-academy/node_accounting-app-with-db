import React, { useState, useContext } from "react";
import { addExpense } from "../../api/expenses";
import { UsersContext } from "../../UsersContext";

type Props = {
  changeCount: number,
  setChangeCount: React.Dispatch<React.SetStateAction<number>>,
};

export const AddExpenseForm: React.FC<Props> = ({ changeCount, setChangeCount }) => {
  const { users } = useContext(UsersContext);

  const [userId, setUserId] = useState(0);
  const [title, setTitle] = useState('');
  const [amount, setAmount] = useState(0);
  const [date, setDate] = useState('');
  const [category, setCategory] = useState('');
  const [note, setNote] = useState('');

  const [isFormOpened, setIsFormOpened] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    addExpense({ userId, title, amount, spentAt: date, category, note})
      .then(() => {
        setIsFormOpened(false);

        setUserId(0);
        setTitle('');
        setAmount(0);
        setDate('');
        setCategory('');
        setNote('');

        setChangeCount(changeCount + 1)
      })
      .catch(err => {throw new Error(err)});
  };

  if (isFormOpened) {
    return(
      <form className="box" onSubmit={handleSubmit}>
        <h2 className="title">Add new expense</h2>
        <button
          type="button"
          className="button"
          onClick={() => setIsFormOpened(false)}
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

        <label className="label">Title</label>
        <input
          className="input"
          type="text"
          value={title}
          onChange={e => setTitle(e.target.value)}
          required
        />

        <label className="label">Amount</label>
        <input
          className="input"
          type="number"
          value={amount}
          onChange={e => setAmount(+e.target.value)}
          required
        />

        <label className="label">Date</label>
        <input
          className="input"
          type="date"
          value={date}
          onChange={e => setDate(e.target.value)}
        />

        <label className="label">Category</label>
        <input
          className="input"
          type="text"
          value={category}
          onChange={e => setCategory(e.target.value)}
          required
        />

        <label className="label">Note</label>
        <input
          className="input"
          type="text"
          value={note}
          onChange={e => setNote(e.target.value)}
        />

        <button
          className="button"
          type="submit"
        >
          Submit
        </button>
      </form>
    );
  }

  return(
    <button className="button" onClick={() => setIsFormOpened(true)}>
      Add a new expense
    </button>
  );
};
