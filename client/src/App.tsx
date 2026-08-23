import React from 'react';
import { CategoryProvider } from './context/CategoryContext.tsx';
import { CategoryPage } from './pages/CategoryPage.tsx';
import './App.css';

export const App: React.FC = () => (
  <CategoryProvider>
    <CategoryPage />
  </CategoryProvider>
);
