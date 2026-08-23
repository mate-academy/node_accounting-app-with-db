import React from 'react';
import { CategoryForm } from '../components/CategoryForm.tsx';
import { CategoryList } from '../components/CategoryList/CategoryList.tsx';

export const CategoryPage: React.FC = () => (
  <div>
    <h2>Manage Categories</h2>
    <CategoryForm />
    <CategoryList />
  </div>
);
