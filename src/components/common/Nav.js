import React from 'react'
import { Link, useHistory, useLocation } from 'react-router-dom'
import { isAuthenticated, removeToken } from '../../lib/auth'
import logo from './mugglemore-logo.png'

function Nav() {
  useLocation()
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
    location.reload()
  }

  return (
    <nav>
      <div className="navbar-start">
        <Link to="/">
          <figure>
            <img className="logo" src={logo} alt="logo"/>
          </figure>
        </Link>  
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
      </div>
      <div className="navbar-end">
        {isAuth && (
          <>
            <Link to="/profile" className="nav-element">
              Profile
            </Link>
            <a
              className="nav-element" 
              onClick={handleLogout}
            >
              Log Out
            </a>
          </>
        )}
        {!isAuth && (
          <>
            <Link to="/register" className="nav-element">
              Register
            </Link>
            <Link to="/login" className="nav-element">
              Login
            </Link>
          </>  
        )}
      </div>
    </nav>        
  )
}
export default Nav