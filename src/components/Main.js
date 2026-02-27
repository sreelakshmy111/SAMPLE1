import React from 'react'
import { useNavigate } from 'react-router-dom'
import './Main.css'

const Main = () => {
  const navigate = useNavigate()

  const logout = () => {
    localStorage.clear()
    navigate('/')
  }

  return (
    <div className="main-container">
      {/* Header */}
      <header className="main-header">
        <h2 className="logo">My Application</h2>

        <nav className="nav-menu">
          <button onClick={() => navigate('/enterprise')}>
            Enterprise
          </button>

          <button onClick={() => navigate('/bussinessUnit')}>
            Business Unit
          </button>

          <button onClick={() => navigate('/region')}>
            Region
          </button>

          <button onClick={logout} className="logout-btn">
            Logout
          </button>
        </nav>
      </header>
    </div>
  )
}

export default Main