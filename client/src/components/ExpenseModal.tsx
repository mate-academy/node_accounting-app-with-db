import { Modal } from 'react-bulma-components';

import ExpenseForm from './ExpenseForm';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setModalState } from '../redux/slices/modalSlice';

const ExpenseModal: React.FC = () => {
  const { variant } = useAppSelector(state => state.modal);
  const { currentExpenseId } = useAppSelector(state => state.expense);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => {
    dispatch(setModalState({ variant: null }));
  };

  return (
    <Modal
      show={variant !== null}
      onClose={handleCloseModal}
    >
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>
            {
              variant === 'new'
                ? 'New expense'
                : `Edit expense #${currentExpenseId}`
            }
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <ExpenseForm />
        </Modal.Card.Body>
        <Modal.Card.Footer className="p-1" />
      </Modal.Card>
    </Modal>
  );
}

export default ExpenseModal;
