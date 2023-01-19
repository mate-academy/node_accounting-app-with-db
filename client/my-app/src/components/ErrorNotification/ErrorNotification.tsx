import { useContext, useEffect } from 'react';
import { ErrorContext } from '../../Contexts/ErrorContext';

export const ErrorNotification = () => {
  const { errorMessage, setErrorMessage } = useContext(ErrorContext);

  useEffect(() => {
    const timer = setTimeout(() => {
      setErrorMessage('');
    }, 1500);

    return () => clearTimeout(timer);
  }, [errorMessage]);

  return (
    <>
      {errorMessage.length && (
        <div className="modal is-active">
          <div className='modal-background'></div>
          <div className='modal-card'>
            <p className='modal-card-body'>
              {errorMessage}
            </p>
          </div>
        </div>
      )}
    </>
  );
};
