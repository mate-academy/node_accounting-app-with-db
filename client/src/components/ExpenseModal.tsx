import { Modal } from 'react-bulma-components';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { setModalState } from '../redux/slices/modalSlice';

import ExpenseForm from './ExpenseForm';

const ExpenseModal: React.FC = () => {
  const { variant, currentExpense } = useAppSelector(state => state.modal);

  const dispatch = useAppDispatch();

  const handleCloseModal = () => dispatch(setModalState({
    variant: null,
    currentExpense: null,
  }));

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
                : `Edit expense #${currentExpense?.id}`
            }
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          <ExpenseForm currentExpense={currentExpense} />
        </Modal.Card.Body>
        <Modal.Card.Footer className="p-1" />
      </Modal.Card>
    </Modal>
  );
}

export default ExpenseModal;
