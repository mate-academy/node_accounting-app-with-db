import { FC } from 'react'
import 'bulma/css/bulma.css';

import { Expenses } from './components/Expenses/Expenses';
import { Users } from './components/Users/Users';
import { SelectedUserProvider } from './Contexts/SelectedUserContext';
import { UsersProvider } from './Contexts/UsersContext';
import { RefreshExpensesProvider } from './Contexts/RefreshExpensesContext';
import { ErrorProvider } from './Contexts/ErrorContext';
import { ErrorNotification } from './components/ErrorNotification';

export const App: FC = () => (
  <div className='columns'>
    <ErrorProvider>
      <ErrorNotification />
      <UsersProvider>
        <SelectedUserProvider>
          <Users />

          <RefreshExpensesProvider>
            <Expenses />
          </RefreshExpensesProvider>
        </SelectedUserProvider>
      </UsersProvider>
    </ErrorProvider>
  </div>
);
