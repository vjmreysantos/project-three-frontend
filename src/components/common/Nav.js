import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'

function Nav() {
  const isAuth = isAuthenticated()
  const { pathname } = useLocation()
  const history = useHistory()
  const [isOpen, setIsOpen] = React.useState(false)

  const handleToggle = () => {
    setIsOpen(!isOpen)
  }

  React.useEffect(() => {
    setIsOpen(false)
  }, [pathname])
  
  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <nav>
      <Link to="/">
        Home
      </Link>
      <Link to="/events">
        Events
      </Link>
      <Link to="/online-events">
        Online Events
      </Link>
      <Link to="/groups">
        Groups
      </Link>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!isAuth && (
              <>
                <Link to="/login" className="btn btn-info">
                  Login
                </Link>
                <Link to="/register" className="btn btn-info">
                  Register
                </Link>
              </>  
            )}
            {isAuth && (
              <button 
                className="btn btn-danger" 
                onClick={handleLogout}
                type="button"
              >
                Log Out
              </button>
            )}
          </div>
        </div>
      </div>
      
      
      
      
    </nav>
  )
}
export default Nav