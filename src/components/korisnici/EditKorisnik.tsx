import React, { FormEvent, useEffect, useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'
import { Korisnik } from './Korisnici'

type Props = {}

const EditKorisnik = (props: Props) => {

  const { id } = useParams()
  const [korisnik, setKorisnik] = useState<Korisnik>({} as Korisnik)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Korisnik>(`http://localhost:8000/korisnici/${id}`, headers())
      .then(res => {
        setKorisnik(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  const edit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()

      if (korisnik == null || korisnik.first_name == '' || korisnik.last_name == '' || korisnik.phone.toString() == '') {
        alert('Sva polja moraju biti popunjena!')
        return
      }
      
      axios.put(`http://localhost:8000/korisnici/${korisnik.id}`, {
        first_name: korisnik.first_name,
        last_name: korisnik.last_name,
        phone: korisnik.phone
      }, headers())
        .then(res => {
          navigate('/korisnici')
        })
        .catch(err => {
          alert(err.response.data)
        })
  }

  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={edit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Ime</Form.Label>
          <Form.Control 
            type="text"
            value={korisnik.first_name}
            onChange={event => setKorisnik({id: korisnik.id, first_name: event.target.value, last_name: korisnik.last_name, phone: korisnik.phone})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="surname">
          <Form.Label>Prezime</Form.Label>
          <Form.Control 
            type="text"
            value={korisnik.last_name}
            onChange={event => setKorisnik({id: korisnik.id, first_name: korisnik.first_name, last_name: event.target.value, phone: korisnik.phone})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="surname">
          <Form.Label>Telefon</Form.Label>
          <Form.Control 
            type="text"
            value={korisnik.phone}
            onChange={event => setKorisnik({id: korisnik.id, first_name: korisnik.first_name, last_name: korisnik.last_name, phone: +event.target.value})}/>
        </Form.Group>

        <Button variant="primary" type="submit">
          Izmeni
        </Button>
      </Form>
    </Row>
  )
}

export default EditKorisnik