import React, { FormEvent, useEffect, useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'

type Props = {}

const AddKorisnik = (props: Props) => {

  const navigate = useNavigate()

  let firstName: string = ''
  let lastName: string = ''
  let phone: string = ''

  const add = (event: FormEvent<HTMLFormElement>): void => {
    
    event.preventDefault()

    if (firstName == '' || lastName == '' || phone == '') {
      alert('Sva polja moraju biti popunjena!')
      return
    }

    axios.post(`http://localhost:8000/korisnici`, {
        first_name: firstName,
        last_name: lastName,
        phone: phone
    }, headers())
      .then(response => {
          navigate('/korisnici')
      })
      .catch(error => {
          alert(error.response.data)
      })
  }



  return (
    <Row md={4} className="justify-content-center">
    <Form onSubmit={add}>
      <Form.Group className="mb-3" controlId="name">
        <Form.Label>Ime</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => firstName = event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="surname">
        <Form.Label>Prezime</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => lastName = event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="phone">
        <Form.Label>Telefon</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => phone = event.target.value}/>
      </Form.Group>

      <Button variant="primary" type="submit">
        Dodaj
      </Button>
    </Form>
  </Row>
  )
}

export default AddKorisnik