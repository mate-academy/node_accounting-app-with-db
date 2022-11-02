import { useEffect, useState } from 'react';
import { Button, Icon, Form, Table, Container, Card } from 'react-bulma-components';
import { deleteExpense } from '../api/Expenses';
import { getUsers } from '../api/Users';
import { useAppSelector } from '../app/hooks';
import { ModalType } from '../types/ModalType';
import { User } from '../types/User';

interface ListProps {
  setModalType: (value: ModalType) => void;
  setHasModal: (value: boolean) => void;
  setSelectedExpenseId: (value: string) => void;
}

export const List: React.FC<ListProps> = ({
  setModalType,
  setHasModal,
  setSelectedExpenseId,
}) => {
  const expenses = useAppSelector((state) => state.expenses.items);
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    getUsers().then((res) => {
      setUsers(res);
    });
  }, []);

  const getUserName = (id: string) => {
    const user = users.find((u) => u.id === id);

    return user?.name;
  };

  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <section className="section has-background-link-light">
      {expenses.length === 0 && <h1 className="title has-text-centered">No expenses yet!</h1>}

      {expenses.length !== 0 && (
        <Container>
          <Card>
            <Card.Content>
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
                  {expenses.map((expense) => (
                    <tr key={expense.id}>
                      <td>{expense.id}</td>
                      <td>{getUserName(expense.userId)}</td>
                      <td>{expense.title}</td>
                      <td>{expense.category}</td>
                      <td>{new Date(expense.spentAt).toLocaleString()}</td>
                      <td>{expense.amount}</td>
                      <td className="is-td-ellipsis" title={expense.note}>
                        {expense.note}
                      </td>
                      <td>
                        <Form.Field className="is-grouped is-justify-content-center">
                          <Button
                            color="info"
                            size="small"
                            className="mr-2"
                            onClick={() => {
                              setHasModal(true);
                              setModalType(ModalType.EDIT_EXPENSE);
                              setSelectedExpenseId(expense.id);
                            }}
                          >
                            <Icon aria-label="Edit">
                              <i className="fas fa-pencil" />
                            </Icon>
                          </Button>

                          <Button
                            color="danger"
                            size="small"
                            onClick={() => {
                              deleteExpense(expense.id);
                              refreshPage();
                            }}
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
            </Card.Content>
          </Card>
        </Container>
      )}
    </section>
  );
};
