import React from 'react'
import 'bulma/css/bulma.css';

import { Expenses } from './components/Expenses/Expenses';
import { Users } from './components/Users/Users';
import { SelectedUserProvider } from './SelectedUserContext';
import { UsersProvider } from './UsersContext';

export const App: React.FC = () => (
  <div className='columns'>
    <UsersProvider>
      <SelectedUserProvider>
        <Users />
        <Expenses />
      </SelectedUserProvider>
    </UsersProvider>
  </div>
);
