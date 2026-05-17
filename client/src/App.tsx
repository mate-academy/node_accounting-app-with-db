import { Route, Routes } from 'react-router-dom';
import './App.scss';
import Users from './pages/Users';
import Layout from './components/Layout';
import Expenses from './pages/Expenses';

const App: React.FC = () =>  {
  return (
    <Routes>
      <Route element={<Layout/>} path='/'>
        <Route element={<Users/>} index/>
        <Route element={<Expenses/>} path="expenses"/>
      </Route>
    </Routes>
  );
}

export default App;
