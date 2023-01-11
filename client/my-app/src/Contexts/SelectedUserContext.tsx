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
  selectedUserId: number | null,
  setSelectedUserId: Dispatch<SetStateAction<number | null>>,
};

export const SelectedUserContext = createContext<СontextProps>({
  selectedUserId: null,
  setSelectedUserId: () => {},
});

export const SelectedUserProvider: FC<PropsWithChildren> = ({ children }) => {
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);

  const contextValue = useMemo(() => {
    return {
      selectedUserId,
      setSelectedUserId,
    };
  }, [selectedUserId]);

  return (
    <SelectedUserContext.Provider value={contextValue}>
      {children}
    </SelectedUserContext.Provider>
  );
};
