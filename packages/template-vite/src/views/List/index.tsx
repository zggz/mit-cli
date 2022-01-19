import { Link, Outlet } from 'react-router-dom'

const List = () => {
  return (
    <div>
      <h1>List</h1>
          <Link to="/list">Courses</Link>
          <hr/>
      <Outlet />
    </div>
  )
}

export default List
