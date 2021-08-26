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