import { useState } from "react";

import { NewExpenseForm } from "../NewExpenseForm";

export const AddExpenseSection = () => {
  const [isFormOpened, setIsFormOpened] = useState(false);

  if (isFormOpened) {
    return (
      <NewExpenseForm closeTheForm={setIsFormOpened} />
    );
  }

  return (
    <button className="button" onClick={() => setIsFormOpened(true)}>
      Add a new expense
    </button>
  );
};
