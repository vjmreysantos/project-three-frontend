import { Link } from 'react-router-dom'

function Nav() {
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
      <Link to="/login">
        Login
      </Link>
      <Link to="/register">
        Register
      </Link>
    </nav>
  )
}
export default Nav