import { useEffect, useState } from 'react';
import { Card, Loader, Notification, Container } from 'react-bulma-components';

import { getExpenses } from '../api/expenses';

import ExpensesList from './ExpensesList';

import { IExpense } from '../types/IExpense';

const Main: React.FC = () => {
  const [expenses, setExpenses] = useState<IExpense[]>([]);
  const [loaded, setIsLoaded] = useState(false);

  const loadExpenses = async () => {
    const expensesFromServer = await getExpenses();

    setIsLoaded(true);
    setExpenses(expensesFromServer);
  };

  useEffect(() => {
    loadExpenses();
  }, []);

  return (
    <section
      className="section has-background-link-light"
    >
      <Container>
        <Card>
          <Card.Content>
            {!loaded && <Loader className="mx-auto is-size-1" />}
            {loaded && !expenses.length && (
              <Notification color="info">
                No saved expenses found. Be first to add!
              </Notification>
            )}
            {loaded && expenses.length > 0 && (
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
