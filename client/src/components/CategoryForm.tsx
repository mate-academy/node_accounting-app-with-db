import React, { useEffect, useState } from 'react';
import { useCategory } from '../context/CategoryContext.tsx';

export const CategoryForm: React.FC = () => {
  const { create, update, editingCategory } = useCategory();
  const [name, setName] = useState('');

  useEffect(() => {
    setName(editingCategory?.name || '');
  }, [editingCategory]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      return;
    }

    if (editingCategory) {
      update(editingCategory, name.trim());
    } else {
      create(name.trim());
    }

    setName('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Category name"
        required
      />
      <button type="submit">{editingCategory ? 'Update' : 'Create'}</button>
    </form>
  );
};
