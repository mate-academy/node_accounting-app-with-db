import React, { useContext, useEffect, useMemo, useState } from 'react';
import {
  getAll as getCategories,
  add as createCategory,
  update as updateCategory,
  remove as deleteCategory,
} from '../api/categories.ts';

import type { Category } from '../types/Category.ts';

interface CategoryContextType {
  categories: Category[];
  editingCategory: Category | null;
  create: (name: string) => void;
  update: (cat: Category, name: string) => void;
  remove: (cat: Category) => Promise<void>;
  setEditingCategory: (cat: Category | null) => void;
}

export const CategoryContext = React.createContext<CategoryContextType | undefined>(undefined);

type Props = {
  children: React.ReactNode;
};

export const CategoryProvider: React.FC<Props> = ({ children }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const showError = (message: string) => {
    setError(message);
    setTimeout(() => setError(''), 3000);
  };

  const fetchCategories = async () => {
    setIsLoading(true);
    try {
    const res = await getCategories();
      setCategories(res);
      setIsLoading(false);
    } catch {
      showError('Unable to load categories');
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const value = useMemo(
    () => ({
      categories,
      editingCategory,
      isLoading,
      error,
      setEditingCategory,
      create: async (name: string) => {
        const newCategory = await createCategory(name);
        if (!newCategory) {
          showError('Failed to add todo');
          return;
        }
        setCategories((prevCategories) => [...prevCategories, newCategory]);
      },

      update: async (cat: Category, name: string) => {
        const { id } = cat;
        setEditingCategory(cat);
        try {
          await updateCategory({ id, name });
          setEditingCategory(null);
          const res = await getCategories();
          setCategories(res);
        } catch {
          showError('Unable to delete a category');
        }
      },

      remove: async (cat: Category) => {
        setEditingCategory(cat);
        try {
          await deleteCategory(cat.id);
          setEditingCategory(null);
          setCategories(currentCategories => currentCategories.filter(c => c.id !== cat.id));
        } catch {
          showError('Unable to delete a category');
        }
      },
  }),

    [categories, editingCategory]
);

  return (
    <CategoryContext.Provider
      value={value}
    >
      {children}
    </CategoryContext.Provider>
  );
};

export const useCategory = () => {
  const context = useContext(CategoryContext);

  if (!context) throw new Error('useCategory must be used within CategoryProvider');

  return context;
};
