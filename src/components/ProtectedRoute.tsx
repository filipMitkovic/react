import { Navigate } from 'react-router-dom'

type Props = {
  children: JSX.Element
}

const ProtectedRoute = ({ children }: Props) => {

  const jwt = localStorage.getItem('jwt')

  if (!jwt) {
    return <Navigate to='/login' replace></Navigate>
  } 

  return children
}

export default ProtectedRoute