import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
} from 'react';
import { User } from './types/User';

type СontextProps = {
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>,
};

export const UsersContext = React.createContext<СontextProps>({
  users: [],
  setUsers: () => {},
});

type Props = {
  children: ReactNode,
};

export const UsersProvider:React.FC<Props> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const contextValue = {
    users,
    setUsers,
  };

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
