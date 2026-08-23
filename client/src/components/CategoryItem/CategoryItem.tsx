import { useCategory } from "../../context/CategoryContext.tsx";
import type { Category } from "../../types/Category.ts";
import styles from './CategoryItem.module.css';

type Props = {
  category: Category;
};

export const CategoryItem: React.FC<Props> = ({ category }) => {
  const { remove, setEditingCategory } = useCategory();

  return <li key={category.id} className={styles.item}>
    {category.name}
    <div className={styles.content}>
      <button onClick={() => setEditingCategory(category)} className={styles.button}>Edit</button>
      <button onClick={() => remove(category)}>Delete</button>
    </div>
  </li>;
}
