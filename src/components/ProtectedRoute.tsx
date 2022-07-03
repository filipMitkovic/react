import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { User, UserContext } from '../App'

type Props = {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {

  const { user } = useContext(UserContext)

  if (!user) {
    return <Navigate to='/login' replace></Navigate>
  } 

  return children
}

export default ProtectedRoute