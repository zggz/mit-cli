import { Link, Outlet, useParams } from 'react-router-dom'

const Course = () => {
  const { id } = useParams<'id'>()
  function capitalizeString (s: string): string {
    return s.charAt(0).toUpperCase() + s.slice(1)
  }
  return (
    <div>
      <h2>
        Welcome to the {id?.split('-').map(capitalizeString).join(' ')} course!
      </h2>

      <p>This is a great course. You &apos re gonna love it!</p>

      <Link to="/list/he-llo">See all courses</Link>
      <Outlet />
    </div>
  )
}

export default Course
