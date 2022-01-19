
import { Outlet, Link } from 'react-router-dom'
function Layout () {
  return (
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/list">Courses</Link>
            </li>
            <li>
              <Link to="/nothing-here">Nothing Here</Link>
            </li>
          </ul>
        </nav>

        <hr />

        <Outlet />
      </div>
  )
}

export default Layout
