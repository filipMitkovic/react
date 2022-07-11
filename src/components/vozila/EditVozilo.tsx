import React, { FormEvent, useEffect, useState } from 'react'
import { Row, Form, Button } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'
import { Model } from '../modeli/Modeli'
import { Korisnik } from '../korisnici/Korisnici'
import { Vozilo } from './Vozila'


const EditVozilo = () => {

  const { id } = useParams()
  const [vozilo, setVozilo] = useState<Vozilo>({} as Vozilo)
  const [modeli, setModeli] = useState<Model[]>([])
  const [korisnici, setKorisnici] = useState<Korisnik[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Vozilo>(`http://localhost:8000/vozila/${id}`, headers())
      .then(res => {
        setVozilo(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
    axios.get<Model[]>(`http://localhost:8000/modeli`, headers())
      .then(res => {
        setModeli(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
    axios.get<Korisnik[]>(`http://localhost:8000/korisnici`, headers())
      .then(res => {
        setKorisnici(res.data)
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  const edit = (event: FormEvent<HTMLFormElement>): void => {
    
      event.preventDefault()

      if (vozilo == null || vozilo.boja == '' || vozilo.broj_motora == NaN 
          || vozilo.broj_registracije == NaN || vozilo.broj_sasije == NaN || vozilo.tip_goriva == '' 
          || vozilo.tip_menjaca == '' || vozilo.korisnikId == NaN || vozilo.modelId == NaN) {
        alert('Sva polja moraju biti popunjena!')
        return
      }
      
      axios.put(`http://localhost:8000/vozila/${vozilo.id}`, {
        tip_goriva: vozilo.tip_goriva,
        tip_menjaca: vozilo.tip_menjaca,
        broj_registracije: vozilo.broj_registracije,
        broj_sasije: vozilo.broj_sasije,
        broj_motora: vozilo.broj_motora,
        boja: vozilo.boja,
        korisnikId: vozilo.korisnikId,
        modelId: vozilo.modelId
      }, headers())
        .then(res => {
          navigate('/vozila')
        })
        .catch(err => {
          alert(err.response.data)
        })
  } 


  return (
    <Row md={4} className="justify-content-center">
    <Form onSubmit={edit}>
      <Form.Group className="mb-3" controlId="model">
        <Form.Label>Model</Form.Label>
        <Form.Select
          value={vozilo.modelId}
          onChange={event => {
              let v = {...vozilo}
              v.modelId = +event.target.value
              setVozilo(v)
            }}>
          <option value={0}>Izaberite</option>
          {modeli.map(model => 
            <option value={model.id}>{model.name}</option>)
          }
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="korisnik">
        <Form.Label>Korisnik</Form.Label>
        <Form.Select
          value={vozilo.korisnikId}
          onChange={event => {
              let v = {...vozilo}
              v.korisnikId = +event.target.value
              setVozilo(v)
            }}>
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
          value={vozilo.broj_sasije}
          onChange={event => {
            let v = {...vozilo}
            v.broj_sasije = +event.target.value
            setVozilo(v)
          }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="registracija">
        <Form.Label>Broj registracije</Form.Label>
        <Form.Control 
          type="text"
          value={vozilo.broj_registracije}
          onChange={event => {
            let v = {...vozilo}
            v.broj_registracije = +event.target.value
            setVozilo(v)
          }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="motor">
        <Form.Label>Broj motora</Form.Label>
        <Form.Control 
          type="text"
          value={vozilo.broj_motora}
          onChange={event => {
            let v = {...vozilo}
            v.broj_motora = +event.target.value
            setVozilo(v)
          }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="boja">
        <Form.Label>Boja</Form.Label>
        <Form.Control 
          type="text"
          value={vozilo.boja}
          onChange={event => {
            let v = {...vozilo}
            v.boja = event.target.value
            setVozilo(v)
          }}/>
      </Form.Group>
      <Form.Group className="mb-3" controlId="menjac">
        <Form.Label>Tip menjaca</Form.Label>
        <Form.Select
          value={vozilo.tip_menjaca}
          onChange={event => {
              let v = {...vozilo}
              v.tip_menjaca = event.target.value
              setVozilo(v)
            }}>
            <option value='5'>5 brzina</option>
            <option value='6'>6 brzina</option>
            <option value='AUTOMATIK'>Automatik</option>
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="gorivo">
        <Form.Label>Tip goriva</Form.Label>
        <Form.Select
          value={vozilo.tip_goriva}
          onChange={event => {
              let v = {...vozilo}
              v.tip_goriva = event.target.value
              setVozilo(v)
            }}>
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

export default EditVozilo