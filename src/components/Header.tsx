import React, { FC, useContext } from 'react'
import { Container, Navbar, Nav, Button } from 'react-bootstrap'
import { UserContext } from '../App'
import { NavLink, useNavigate } from 'react-router-dom'

interface Props {
}

const Header: FC = (props: Props) => {

  const { user, setUser } = useContext(UserContext)

  const navigate = useNavigate()

  const handleLog = (): void => {
    if (user) {
      localStorage.removeItem('id')
      localStorage.removeItem('jwt')
      localStorage.removeItem('email')
      setUser(null)
    }

    navigate('/login')
  }

  return (
    <Navbar bg="primary" variant="dark">
      <Container>
          <Navbar.Brand href="/">AutoServis</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/pruzene-usluge">Pruzene usluge</Nav.Link>
            <Nav.Link as={NavLink} to="/proizvodjaci">Proizvodjaci</Nav.Link>
            <Nav.Link as={NavLink} to="/modeli">Modeli</Nav.Link>
            <Nav.Link as={NavLink} to="/usluge">Usluge</Nav.Link>
            <Nav.Link as={NavLink} to="/korisnici">Korisnici</Nav.Link>
          </Nav>
          <Button 
          variant={user == null ? 'success' : 'danger'}
          onClick={handleLog}>{
            user == null ? 'Login' : 'Logout'
          }</Button>
      </Container>
    </Navbar>
  )
}

export default Header