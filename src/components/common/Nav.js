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
    location.reload()
  }

  return (
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <figure>
          <img className="logo" src={logo} alt="logo"/>
        </figure>
        <div id="main-navigation">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/events" className="nav-link">
                Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/online-events" className="nav-link">
                Online Events
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/groups" className="nav-link">
                Groups
              </Link>
            </li>
          </ul>
        </div>
        <div className="navbar-end">
          <div className="navbar-item">
            <div className="buttons">
              {!isAuth && (
                <>
                  <Link to="/login" className="btn btn-info nav-element">
                  Login
                  </Link>
                  <Link to="/register" className="btn btn-info nav-element">
                  Register
                  </Link>
                </>  
              )}
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
            </div>
          </div>
        </div>
      </div>
    </nav>        
  )
}
export default Nav