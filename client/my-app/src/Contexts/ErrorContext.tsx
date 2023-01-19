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
  errorMessage: string,
  setErrorMessage: Dispatch<SetStateAction<string>>,
};

export const ErrorContext = createContext<СontextProps>({
  errorMessage: '',
  setErrorMessage: () => {},
});

export const ErrorProvider: FC<PropsWithChildren> = ({ children }) => {
  const [errorMessage, setErrorMessage] = useState<string>('');

  const contextValue = useMemo(() => ({
    errorMessage,
    setErrorMessage,
  }), [errorMessage]);

  return (
    <ErrorContext.Provider value={contextValue}>
      {children}
    </ErrorContext.Provider>
  );
};

