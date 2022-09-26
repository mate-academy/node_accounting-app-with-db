import { Button, Icon, Form, Table } from 'react-bulma-components';

import { removeExpense } from '../api/expenses';

import { useAppDispatch } from '../redux/hooks';
import { fetchExpenses, setCurrentExpenseId } from '../redux/slices/expenseSlice';
import { setModalState } from '../redux/slices/modalSlice';

import { IExpense } from '../types/Expense.interface';

type TProps = {
  expenses: IExpense[];
};

const ExpensesList: React.FC<TProps> = ({ expenses }) => {
  const dispatch = useAppDispatch();

  const handleOpenEditModal = (expense: IExpense) => {
    dispatch(setCurrentExpenseId(expense.id));
    dispatch(setModalState({ variant: 'edit' }));
  };

  const handleDelete = async(expenseId: number) => {
    await removeExpense(expenseId);

    dispatch(fetchExpenses());
  }

  return (
    <Table size="fullwidth" bordered hoverable>
    <thead>
      <tr>
        <th>Id</th>
        <th>User</th>
        <th>Title</th>
        <th>Category</th>
        <th>Date</th>
        <th>Amount</th>
        <th>Note</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      {expenses.map(expense => (
        <tr key={expense.id}>
          <td>{expense.id}</td>
          <td>{expense.user}</td>
          <td>{expense.title}</td>
          <td>{expense.category}</td>
          <td>{new Date(expense.date).toLocaleString()}</td>
          <td>{expense.amount}</td>
          <td
            className="is-td-ellipsis"
            title={expense.note}
          >
            {expense.note}
          </td>
          <td>
            <Form.Field className="is-grouped is-justify-content-center">
              <Button
                color="info"
                size="small"
                className="mr-2"
                onClick={() => handleOpenEditModal(expense)}
              >
                <Icon aria-label="Edit">
                  <i className="fas fa-pencil" />
                </Icon>
              </Button>

              <Button
                color="danger"
                size="small"
                onClick={() => handleDelete(expense.id)}
              >
                <Icon aria-label="Delete">
                  <i className="fas fa-trash" />
                </Icon>
              </Button>
            </Form.Field>
          </td>
        </tr>
      ))}
    </tbody>
  </Table>
  );
}

export default ExpensesList;
