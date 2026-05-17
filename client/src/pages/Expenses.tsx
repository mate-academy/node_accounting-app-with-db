import { FormEvent, useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import axios from 'axios';
import { useUser } from '../context/context';
import FormExpense from '../components/FormExpense';

const Expenses = () => {
  const {getExpenses, expenses, user, getUser} = useUser()
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  const [isUpdated, setIsUpdated] = useState(false);

  useEffect(() =>{
    if (userId) {
      getExpenses(+userId)
      getUser(+userId)

    }
  }, [])

  const createExpense = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    axios
      .post('http://localhost:8080/expenses', {
        userId,
        ...Object.fromEntries(formData.entries())
      })
      .then(() => {
        if (userId) getExpenses(+userId)
      })
      .catch(err => console.log(err))
      .finally(() => {
        form.reset()
      })
  }
  const updateExpense = async (e: FormEvent<HTMLFormElement>,id: number) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    axios
      .patch(`http://localhost:8080/expenses/${id}`, {
        userId,
        ...Object.fromEntries(formData.entries())
      })
      .then(() => {
        if (userId) getExpenses(+userId)

        setIsUpdated(false);
      })
      .catch(err => console.log(err))
      .finally(() => {
        form.reset()
      })
  }

  const deleteExpense = (id: number) => {
    axios.delete(`http://localhost:8080/expenses/${id}`)
    .then(() =>{
      if (userId) getExpenses(+userId)
        console.log('done')
    })
    .catch((err) => console.log(err))
  }

  return (
    <div>
      <h1 className='title'>Expenses from {user?.name}</h1>
      <div className='box'>
        <FormExpense onSubmit={createExpense}/>
      </div>
      {expenses.length === 0
        ? <p>There is no expenses</p>
        : (
          <ul>
            {expenses.map(expense => (
              <li className='expense box' key={expense.id}>
                {isUpdated
                  ? <FormExpense
                      onSubmit={(e) => updateExpense(e, expense.id)}
                      title={expense.title}
                      category={expense.category}
                      amount={expense.amount}
                    />
                  : (
                    <p className='expense__info'>
                      <h3 className='subtitle'>{expense.title}</h3>
                      <p>{expense.category}</p>
                      <p>Amount: {+expense.amount}</p>
                    </p>
                  )
                }
                <button
                  className='expense__btn button'
                  onClick={() => setIsUpdated(!isUpdated)}
                >Update</button>
                <button
                  onClick={() => deleteExpense(expense.id)}
                  className='expense__btn button is-danger'
                >Delete</button>
              </li>
            ))}
          </ul>
        )
      }
    </div>
  )
}

export default Expenses
