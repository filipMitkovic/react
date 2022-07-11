import React, { FormEvent, useEffect, useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'
import { Proizvodjac } from '../proizvodjaci/Proizvodjaci'


const AddModel = () => {

  const [proizvodjaci, setProizvodjaci] = useState<Proizvodjac[]>([])
  const navigate = useNavigate()

  let name: string = ''
  let proizvodjacId: string = '1'

  useEffect(() => {
    axios.get<Proizvodjac[]>('http://localhost:8000/proizvodjaci', headers())
      .then(res => {
        setProizvodjaci(res.data)
      }) 
  }, [])

  const add = (event: FormEvent<HTMLFormElement>): void => {
    
    event.preventDefault()

    if (name == '' || proizvodjacId == '') {
      alert('Sva polja moraju biti popunjena!')
      return
    }

    axios.post(`http://localhost:8000/modeli`, {
        name: name,
        proizvodjacId: +proizvodjacId
    }, headers())
      .then(response => {
          navigate('/modeli')
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
        <Form.Group className="mb-3" controlId="proizvodjac">
          <Form.Label>Proizvodjac</Form.Label>
          <Form.Select onChange={event => proizvodjacId = event.target.value}>
            {proizvodjaci.map(proizvodjac => 
              <option value={proizvodjac.id}>{proizvodjac.name}</option>)
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </Row>
  )
}

export default AddModel