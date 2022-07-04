import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import headers from '../..//Axios'
import { Proizvodjac } from './Proizvodjaci'
import { Row, Form, Button } from 'react-bootstrap'


const EditProizvodjac = () => {

  const { id } = useParams()
  const [proizvodjac, setProizvodjac] = useState<Proizvodjac>({id: 0, name: ''})
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Proizvodjac>(`http://localhost:8000/proizvodjaci/${id}`, headers())
      .then(res => {
        setProizvodjac(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  const edit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()
      if (proizvodjac.name == '') {
        alert('Sva polja moraju biti popunjena!')
        return
      }
      
      axios.put(`http://localhost:8000/proizvodjaci/${proizvodjac.id}`, {
        name: proizvodjac.name
      }, headers())
        .then(res => {
          navigate('/proizvodjaci')
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
            value={proizvodjac.name}
            onChange={event => setProizvodjac({id: proizvodjac.id, name: event.target.value})}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Izmeni
        </Button>
      </Form>
    </Row>
  )
}

export default EditProizvodjac