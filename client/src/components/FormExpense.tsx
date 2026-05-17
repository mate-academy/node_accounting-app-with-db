import React, { FormEvent } from 'react'

type Props = {
  title?: string
  category?: string,
  amount?: number
  onSubmit: (e: FormEvent<HTMLFormElement>) => Promise<void>
}
const FormExpense:React.FC<Props> = ({onSubmit, title = '', category = '', amount}) => {
  return (
    <form onSubmit={onSubmit} className='form'>
      <input defaultValue={title} className='input' type="text" name='title' placeholder='Title'/>
      <input defaultValue={category} className='input' type='text' name='category' placeholder='Category'/>
      <input defaultValue={amount} className='input' type="number" name='amount' placeholder='Amount'/>
      <button className='button is-success'>Save</button>
    </form>
  )
}

export default FormExpense
