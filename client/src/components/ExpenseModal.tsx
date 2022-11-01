import { Modal } from 'react-bulma-components';
import { ModalType } from '../types/ModalType';
import { EditForm } from './EditForm';
import { ExpensesForm } from './ExpensesForm';
import { UsersForm } from './UsersForm';

type Props = {
  setHasModal: (value: boolean) => void;
  hasModal: boolean;
  modalType: ModalType | undefined;
  selectedExpenseId: string;
};

export const ExpenseModal: React.FC<Props> = ({
  setHasModal,
  hasModal,
  modalType,
  selectedExpenseId,
}) => {
  const handleCloseModal = () => {
    setHasModal(false);
  };

  return (
    <Modal show={hasModal} onClose={handleCloseModal}>
      <Modal.Card>
        <Modal.Card.Header showClose>
          <Modal.Card.Title>
            {modalType === ModalType.NEW_EXPENSE && 'New Expense'}
            {modalType === ModalType.NEW_USER && 'New User'}
            {modalType === ModalType.EDIT_EXPENSE && 'Edit Expense'}
          </Modal.Card.Title>
        </Modal.Card.Header>
        <Modal.Card.Body>
          {modalType === ModalType.NEW_EXPENSE && (
            <ExpensesForm setHasModal={setHasModal} />
          )}

          {modalType === ModalType.NEW_USER && (
            <UsersForm setHasModal={setHasModal} />
          )}

          {modalType === ModalType.EDIT_EXPENSE && (
            <EditForm
              setHasModal={setHasModal}
              selectedExpenseId={selectedExpenseId}
            />
          )}
        </Modal.Card.Body>
        <Modal.Card.Footer className="p-1" />
      </Modal.Card>
    </Modal>
  );
};
