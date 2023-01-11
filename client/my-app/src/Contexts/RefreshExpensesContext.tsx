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
  changeCount: number,
  setChangeCount: Dispatch<SetStateAction<number>>,
};

export const RefreshExpensesContext = createContext<СontextProps>({
  changeCount: 0,
  setChangeCount: () => {},
});

export const RefreshExpensesProvider: FC<PropsWithChildren> = ({ children }) => {
  const [changeCount, setChangeCount] = useState<number>(0);

  const contextValue = useMemo(() => {
    return {
      changeCount,
      setChangeCount,
    };
  }, [changeCount]);

  return (
    <RefreshExpensesContext.Provider value={contextValue}>
      {children}
    </RefreshExpensesContext.Provider>
  );
};
