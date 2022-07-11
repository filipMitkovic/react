import React, { useState, useEffect, FormEvent, FC, useContext } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { UserContext } from '../App';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'
import { Row } from 'react-bootstrap';

interface LoginResponse {
    id: number,
    jwt: string
}

const Login: FC = () => {

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const context = useContext(UserContext)
  const navigate = useNavigate()

  useEffect(() => {
    console.log('Mounted');
  }, [])

  const login = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    axios.post<LoginResponse>(`http://localhost:8000/login`, {
        email: email,
        password: password
    }).then(response => {
        console.log(response.data)
        localStorage.setItem('email', email)
        localStorage.setItem('id', JSON.stringify(response.data.id))
        localStorage.setItem('jwt', response.data.jwt)
        context.setUser({email: email, password: password})
        navigate('/pruzene-usluge')
    }).catch(error => {
        console.log('error')
        alert(error.response.data)
    })

  }


  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={login}>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email"
            onChange={event => setEmail(event.target.value)}/>
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password"
            onChange={event => setPassword(event.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit">
          Login
        </Button>
      </Form>
    </Row>
  )
}

export default Login