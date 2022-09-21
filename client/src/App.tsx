import Main from './components/Main';
import Navigation from './components/Navigation';
import ExpenseModal from './components/ExpenseModal';

import '@fortawesome/fontawesome-free/css/all.css';
import 'bulma/css/bulma.css';
import './App.css';

export default function App() {
  return (
    <>
      <Navigation />
      <Main />
      <ExpenseModal />
    </>
  );
}
