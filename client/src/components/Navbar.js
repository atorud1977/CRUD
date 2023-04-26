import React, { useContext } from 'react'
import "./Navbar.css"
import { AuthContext } from '../AuthContext'
import { Link } from 'react-router-dom'

function Navbar() {
  const {logout,isLogin} = useContext(AuthContext)
  return (
    <nav >
    <div className="nav-wrapper">
      <div className='nav-container'>
      <a href="/" className="brand-logo">Debt book app </a>
      {
        isLogin
        ? <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/" onClick={logout}>Chiqish</Link></li> 
      </ul>
      : <ul id="nav-mobile" className="right hide-on-med-and-down">
        <li><Link to="/">Kirish</Link></li>
      
    </ul>
      }
      </div>
      
    </div>
  </nav>
  )
}

export default Navbar