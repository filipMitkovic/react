import React, { FormEvent, useEffect, useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'
import { Model } from '../modeli/Modeli'
import { Korisnik } from '../korisnici/Korisnici'


const AddVozilo = () => {

  const [modeli, setModeli] = useState<Model[]>([])
  const [korisnici, setKorisnici] = useState<Korisnik[]>([])
  const navigate = useNavigate()

  let modelId: number = 0
  let korisnikId: number = 0
  let tipMenjaca: string = '5'
  let tipGoriva: string = 'BENZIN'
  let brojRegistracije: number = -1
  let brojSasije: number = -1
  let brojMotora: number = -1
  let boja: string = ''

  useEffect(() => {
    axios.get<Model[]>('http://localhost:8000/modeli', headers())
      .then(res => {
        setModeli(res.data)
      })
    axios.get<Korisnik[]>('http://localhost:8000/korisnici', headers())
      .then(res => {
        setKorisnici(res.data)
      })
  }, [])

  const add = (event: FormEvent<HTMLFormElement>): void => {
    
    event.preventDefault()

    if (korisnikId == 0 || modelId == 0 || brojMotora == -1 || brojSasije == -1 || brojRegistracije == -1 || boja == '') {
      alert('Sva polja moraju biti popunjena!')
      return
    }

    
    axios.post(`http://localhost:8000/vozila`, {
        tip_goriva: tipGoriva,
        tip_menjaca: tipMenjaca,
        broj_registracije: brojRegistracije,
        broj_sasije: brojSasije,
        broj_motora: brojMotora,
        boja: boja,
        korisnikId: korisnikId,
        modelId: modelId
    }, headers())
      .then(response => {
          navigate('/vozila')
      })
      .catch(error => {
          alert(error.response.data)
      })
  }

  return (
    <Row md={4} className="justify-content-center">
    <Form onSubmit={add}>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Select onChange={event => modelId = +event.target.value}>
          <option value={0}>Izaberite</option>
          {modeli.map(model => 
            <option value={model.id}>{model.name}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="korisnik">
        <Form.Label>Korisnik</Form.Label>
        <Form.Select onChange={event => korisnikId = +event.target.value}>
          <option value={0}>Izaberite</option>
          {korisnici.map(korisnik => 
            <option value={korisnik.id}>{`${korisnik.first_name} ${korisnik.last_name}`}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="sasija">
        <Form.Label>Broj sasije</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => brojSasije = +event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="registracija">
        <Form.Label>Broj registracije</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => brojRegistracije = +event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="motor">
        <Form.Label>Broj motora</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => brojMotora = +event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="boja">
        <Form.Label>Boja</Form.Label>
        <Form.Control 
          type="text"
          onChange={event => boja = event.target.value}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="menjac">
        <Form.Label>Tip menjaca</Form.Label>
        <Form.Select onChange={event => tipMenjaca = event.target.value}>
            <option value='5'>5 brzina</option>
            <option value='6'>6 brzina</option>
            <option value='AUTOMATIK'>Automatik</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="gorivo">
        <Form.Label>Tip goriva</Form.Label>
        <Form.Select onChange={event => tipGoriva = event.target.value}>
            <option value='BENZIN'>Benzin</option>
            <option value='DIZEL'>Dizel</option>
        </Form.Select>
      </Form.Group>

      <Button variant="primary" type="submit" className='mb-5'>
        Dodaj
      </Button>
    </Form>
  </Row>
  )
}

export default AddVozilo