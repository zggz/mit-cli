import { RouteObject, useRoutes } from 'react-router-dom'

import Layout from '@/layout'
import Demo from '@/views/Demo'
import List from '@/views/List'

import NoMatch from '@/views/NoMatch'
import Course from '@/views/Course'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    children: [
      { index: true, element: <Demo /> },
      {
        path: '/List',
        element: <List />,
        children: [
          { index: true, element: <Course /> },
          { path: '/List/:id', element: <Course /> }
        ]
      },
      { path: '*', element: <NoMatch /> }
    ]
  }
]

const AppRouter = () => {
  return <>{useRoutes(routes)}</>
}

export default AppRouter
