import React from 'react'
import { Link, useHistory } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'
import logo from './mugglemore-logo.png'

function Nav() {
  const isAuth = isAuthenticated()
  // const { pathname } = useLocation()
  const history = useHistory()
  // const [isOpen, setIsOpen] = React.useState(false)

  // const handleToggle = () => {
  //   setIsOpen(!isOpen)
  // }

  // React.useEffect(() => {
  //   setIsOpen(false)
  // }, [pathname])
  
  const handleLogout = () => {
    removeToken()
    history.push('/')
  }

  return (
    <nav>
      <figure>
        <img className="logo" src={logo} alt="logo"/>
      </figure>
      <Link to="/" className="nav-element">
        Home
      </Link>
      <Link to="/events" className="nav-element">
        Events
      </Link>
      <Link to="/online-events" className="nav-element">
        Online Events
      </Link>
      <Link to="/groups" className="nav-element">
        Groups
      </Link>
      <div className="navbar-end">
        <div className="navbar-item">
          <div className="buttons">
            {!isAuth && (
              <>
                <Link to="/login" className="nav-element">
                  Login
                </Link>
                <Link to="/register" className="nav-element">
                  Register
                </Link>
              </>  
            )}
            {isAuth && (
              <a 
                className="nav-element" 
                onClick={handleLogout}
                type="button"
              >
                Log Out
              </a>
            )}
          </div>
        </div>
      </div>
      
      
      
      
    </nav>
  )
}
export default Nav