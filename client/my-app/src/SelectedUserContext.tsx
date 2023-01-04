import React, {
  Dispatch,
  ReactNode,
  SetStateAction,
  useState,
  useMemo,
} from 'react';

type СontextProps = {
  selectedUserId: number | null,
  setSelectedUserId: Dispatch<SetStateAction<number | null>>,
};

export const SelectedUserContext = React.createContext<СontextProps>({
  selectedUserId: null,
  setSelectedUserId: () => {},
});

type Props = {
  children: ReactNode,
};

export const SelectedUserProvider: React.FC<Props> = ({ children }) => {
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
