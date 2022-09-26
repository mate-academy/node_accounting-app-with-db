import { useAppDispatch } from '../redux/hooks';
import { Navbar, Container, Button, Heading, Icon, Level } from 'react-bulma-components';
import { setModalState } from '../redux/slices/modalSlice';
import { setCurrentExpenseId } from '../redux/slices/expenseSlice';

const Navigation: React.FC = () => {
  const dispatch = useAppDispatch();

  const handleNewExpense = () => {
    dispatch(setCurrentExpenseId(null));
    dispatch(setModalState({ variant: 'new' }));
  };

  return (
    <Navbar
      fixed="top"
      className="has-shadow py-2"
    >
      <Container>
        <Level className="is-flex-grow-1 px-2">
          <Level.Side align="left">
            <Level.Item>
              <Heading size={4}>
                <Icon
                  aria-label="Delete"
                  className="mr-2"
                  color="success"
                >
                  <i className="fa-solid fa-hand-holding-dollar" />
                </Icon>
                <span>Expenses manager</span>
              </Heading>
            </Level.Item>
          </Level.Side>
          <Level.Side align="right">
            <Level.Item>
              <Button
                  color="success"
                  className="is-align-self-center"
                  onClick={handleNewExpense}
                >
                  <Icon aria-label="Add">
                    <i className="fas fa-plus" />
                  </Icon>
                  <span>Add new expense</span>
                </Button>
            </Level.Item>
          </Level.Side>
        </Level>
      </Container>
    </Navbar>
  )
}

export default Navigation;
