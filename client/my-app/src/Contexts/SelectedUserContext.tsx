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
  selectedUserId: string,
  setSelectedUserId: Dispatch<SetStateAction<string>>,
};

export const SelectedUserContext = createContext<СontextProps>({
  selectedUserId: '',
  setSelectedUserId: () => {},
});

export const SelectedUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<string>('');

  const contextValue = useMemo(() => ({
    selectedUserId,
    setSelectedUserId,
  }), [selectedUserId]);

  return (
    <SelectedUserContext.Provider value={contextValue}>
      {children}
    </SelectedUserContext.Provider>
  );
};
