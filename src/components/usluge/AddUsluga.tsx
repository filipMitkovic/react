import React, { FormEvent } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'


const AddUsluga = () => {

  const navigate = useNavigate()

  let name: string = ''
  let cena: string = ''

  const add = (event: FormEvent<HTMLFormElement>): void => {
    
    event.preventDefault()

    if (name == '' || cena == '') {
      alert('Sva polja moraju biti popunjena!')
      return
    }

    axios.post(`http://localhost:8000/usluge`, {
        name: name,
        cena: +cena
    }, headers())
      .then(response => {
          navigate('/usluge')
      })
      .catch(error => {
          alert(error.response.data)
      })
  }

  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={add}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            onChange={event => name = event.target.value}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cena">
          <Form.Label>Cena</Form.Label>
          <Form.Control 
            type="text"
            onChange={event => cena = event.target.value}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </Row>
  )
}

export default AddUsluga