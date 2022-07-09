import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import headers from '../..//Axios'
import { Usluga } from './Usluge'
import { Row, Form, Button } from 'react-bootstrap'

const EditUsluga = () => {

  const { id } = useParams()
  const [usluga, setUsluga] = useState<Usluga>({id: 0, name: '', cena: 0})
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Usluga>(`http://localhost:8000/usluge/${id}`, headers())
      .then(res => {
        setUsluga(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  const edit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      if (usluga.name == '' || usluga.cena == 0) {
        alert('Sva polja moraju biti popunjena!')
        return
      }
      
      axios.put(`http://localhost:8000/usluge/${usluga.id}`, {
        name: usluga.name,
        cena: usluga.cena
      }, headers())
        .then(res => {
          navigate('/usluge')
        })
        .catch(err => {
          alert(err.response.data)
        })
  } 


  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={edit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            value={usluga.name}
            onChange={event => setUsluga({id: usluga.id, name: event.target.value, cena: usluga.cena})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cena">
          <Form.Label>Cena</Form.Label>
          <Form.Control 
            type="text"
            value={usluga.cena}
            onChange={event => setUsluga({id: usluga.id, name: usluga.name, cena: +event.target.value})}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Izmeni
        </Button>
      </Form>
    </Row>
  )
}

export default EditUsluga