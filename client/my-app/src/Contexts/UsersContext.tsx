import {
  Dispatch,
  SetStateAction,
  useState,
  useMemo,
  FC,
  PropsWithChildren,
  createContext,
} from 'react';

type СontextProps = {
  users: User[],
  setUsers: Dispatch<SetStateAction<User[]>>,
};

export const UsersContext = createContext<СontextProps>({
  users: [],
  setUsers: () => {},
});

export const UsersProvider: FC<PropsWithChildren> = ({ children }) => {
  const [users, setUsers] = useState<User[]>([]);

  const contextValue = useMemo(() => {
    return {
      users,
      setUsers,
    };
  }, [users]);

  return (
    <UsersContext.Provider value={contextValue}>
      {children}
    </UsersContext.Provider>
  );
};
