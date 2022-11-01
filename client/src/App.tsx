import React, { useEffect, useState } from 'react';
import './App.scss';
import { Header } from './components/Header';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init } from './redux/expensesSlice';
import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import { ExpenseModal } from './components/ExpenseModal';
import { ModalType } from './types/ModalType';
import { Loader } from 'react-bulma-components';
import { List } from './components/List';

function App() {
  const dispatch = useAppDispatch();
  const [hasModal, setHasModal] = useState(false);
  const [modalType, setModalType] = useState<ModalType>();
  const loading = useAppSelector((state) => state.expenses.loading);
  const [selectedExpenseId, setSelectedExpenseId] = useState('');

  useEffect(() => {
    dispatch(init());
  }, []);


  return (
    <div className="App block">
      <Header setHasModal={setHasModal} setModalType={setModalType} />

      {loading ? (
        <Loader className="mx-auto is-size-1 mt-5" />
      ) : (
        <>
          <List
            setModalType={setModalType}
            setHasModal={setHasModal}
            setSelectedExpenseId={setSelectedExpenseId}
          />
          <ExpenseModal
            setHasModal={setHasModal}
            hasModal={hasModal}
            modalType={modalType}
            selectedExpenseId={selectedExpenseId}
          />
        </>
      )}
    </div>
  );
}

export default App;
