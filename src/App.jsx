import React from 'react'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Pages/Home'
import About from './Pages/About'
import Contact from './Pages/Contact'
import Services from './Pages/Services'
import Register from './Pages/Register'
import Login from './Pages/Login'
import Layout from './Layout/Layout'
import ErrorPage from './Pages/ErrorPage'
import Logout from './Pages/Logout'
import AdminContacts from './Pages/AdminContacts'
import AdminLayout from './Layout/Admin-Layout'
import AdminUsers from './Pages/AdminUsers'
import AdminUpdate from './Pages/AdminUpdate'
import ProtectedAdminRoute from './Pages/ProtectedAdminRoute'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: '/',
        element: <Home />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/about',
        element: <About />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/contact',
        element: <Contact />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/services',
        element: <Services />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/register',
        element: <Register />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/login',
        element: <Login />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/logout',
        element: <Logout />,
        errorElement: <ErrorPage />,
      },
      {
        path: '/admin',
        element: (
          <ProtectedAdminRoute>
          <AdminLayout />
        </ProtectedAdminRoute>
        ),
        errorElement: <ErrorPage />,
        children: [
          {
            path: 'users',
            element: <AdminUsers />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'users/:id/edit',
            element: <AdminUpdate />,
            errorElement: <ErrorPage />,
          },
          {
            path: 'contacts',
            element: <AdminContacts />,
            errorElement: <ErrorPage />,
          },

        ]

      },

    ]
  }
])

const App = () => {
  return <RouterProvider router={router} />
}

export default App
