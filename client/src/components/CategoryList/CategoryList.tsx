import React from 'react';
import { useCategory } from '../../context/CategoryContext.tsx';
import { CategoryItem } from '../CategoryItem/CategoryItem.tsx';
import styles from './CategoryList.module.css';

export const CategoryList: React.FC = () => {
  const { categories } = useCategory();

  return (
    <ul className={styles.list}>
      {categories.map((cat) => (
        <CategoryItem category={cat} key={cat.id} />
      ))}
    </ul>
  );
};
