import {
  Navbar,
  Container,
  Button,
  Heading,
  Icon,
  Level,
} from 'react-bulma-components';
import { ModalType } from '../types/ModalType';

interface Props {
  setHasModal: (value: boolean) => void;
  setModalType: (value: ModalType) => void;
}

export const Header: React.FC<Props> = ({ setHasModal, setModalType }) => {

  const handleUserClick = () => {
    setHasModal(true);
    setModalType(ModalType.NEW_USER);
  };

  const handleExpenseClick = () => {
    setHasModal(true);
    setModalType(ModalType.NEW_EXPENSE);
  };

  return (
    <Navbar fixed="top" className="has-shadow py-2">
      <Container>
        <Level className="is-flex-grow-1 px-2">
          <Level.Side align="left">
            <Level.Item>
              <Heading size={4}>
                <Icon aria-label="Delete" className="mr-2" color="success">
                  <i className="fa-solid fa-hand-holding-dollar" />
                </Icon>
                <span>Expenses in DB</span>
              </Heading>
            </Level.Item>
          </Level.Side>
          <Level.Side>
            <Level.Item>
              <Button
                color="success"
                className="is-align-self-center"
                onClick={() => {
                  handleExpenseClick();
                }}
              >
                <Icon aria-label="Add">
                  <i className="fas fa-plus" />
                </Icon>
                <span>Add new expense</span>
              </Button>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <Button
                color="success"
                className="is-align-self-center"
                onClick={() => {
                  handleUserClick();
                }}
              >
                <Icon aria-label="Add">
                  <i className="fas fa-plus" />
                </Icon>
                <span>Add new user</span>
              </Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Container>
    </Navbar>
  );
};
