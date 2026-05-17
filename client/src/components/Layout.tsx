import React from 'react'
import { Outlet } from 'react-router-dom'

const Layout = () => {
  return (
    <div className='container'>
      <section className="hero is-primary">
        <div className="hero-body">
          <p className="title">Accounting app</p>
          <p className="subtitle">with db</p>
        </div>
      </section>
      <Outlet/>
    </div>
  )
}

export default Layout;
