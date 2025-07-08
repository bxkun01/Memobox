import { useState } from 'react'
import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom"
import Login from './pages/Login'
import Home from './pages/Home'
import NotFound from './pages/404'
import Register from './pages/Register'
import ProtectedRoutes from './components/ProtectedRoutes'
import Navbar from './components/navbar'
import NoteCreate from './pages/NoteCreate'
import NoteUpdate from './pages/NoteUpdate'

function Logout() {
  localStorage.clear()
  return <Navigate to="/login" />
}

function RegisterAndLogout() {
  localStorage.clear()
  return <Register />
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <ProtectedRoutes><Home /></ProtectedRoutes>,
  },
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/logout",
    element: <Logout />,
  },
  {
    path: "/register",
    element: <RegisterAndLogout />
  },
  {
    path: '*',
    element: <NotFound />
  },
  {
    path: 'note/create/',
    element: <NoteCreate />
  },
  {
    path: 'note/update/:noteId',
    element: <NoteUpdate />


  }

]);


function App() {

  return (
    <RouterProvider router={router} />
  )
}

export default App
