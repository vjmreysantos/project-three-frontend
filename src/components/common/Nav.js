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
    <nav className="navbar navbar-expand-md navbar-dark">
      <div className="container-fluid">
        <figure>
          <img className="logo" src={logo} alt="logo"/>
        </figure>
        <button 
          className="navbar-toggler navbar-dark" 
          type="button" 
          data-toggle="collapse" 
          data-target="#main-navigation"
        > 
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="main-navigation">
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
                  <Link to="/login" className="btn btn-info">
                  Login
                  </Link>
                  <Link to="/register" className="btn btn-info">
                  Register
                  </Link>
                </>  
              )}
              {isAuth && (
                <>
                  <Link to="/profile" className="btn btn-info">
                    Profile
                  </Link>
                  <button 
                    className="btn btn-danger" 
                    onClick={handleLogout}
                    type="button"
                  >
                    Log Out
                  </button>
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