import { useEffect } from 'react';
import { Card, Loader, Notification, Container } from 'react-bulma-components';

import ExpensesList from './ExpensesList';

import { fetchExpenses } from '../redux/slices/expenseSlice';
import { useAppDispatch, useAppSelector } from '../redux/hooks'
;
import { EStatus } from '../types/Status.enum';

const Main: React.FC = () => {
  const { expenses, status } = useAppSelector(state => state.expense);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  return (
    <section
      className="section has-background-link-light"
    >
      <Container>
        <Card>
          <Card.Content>
            {status === EStatus.PENDING && <Loader className="mx-auto is-size-1" />}
            {status === EStatus.ERROR && (
              <Notification color="danger">
                Error occured while loading data from server.
              </Notification>
            )}
            {status === EStatus.SUCCESS && !expenses.length && (
              <Notification color="info">
                No saved expenses found. Be first to add!
              </Notification>
            )}
            {status === EStatus.SUCCESS && expenses.length > 0 && (
              <ExpensesList
                expenses={expenses}
              />
            )}
          </Card.Content>
        </Card>
      </Container>
    </section>
  );
}

export default Main;
