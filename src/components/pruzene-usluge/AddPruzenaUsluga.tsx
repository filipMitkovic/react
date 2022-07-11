import React, { ChangeEvent, FormEvent, useEffect, useRef, useState } from 'react'
import { Row, Form, Button, FormControlProps } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import headers from '../../Axios'
import { Usluga } from '../usluge/Usluge'
import { Vozilo } from '../vozila/Vozila'


const AddPruzenaUsluga = () => {

  const [usluge, setUsluge] = useState<Usluga[]>([])
  const [vozila, setVozila] = useState<Vozilo[]>([])
  const [cenaUsluge, setCenaUsluge] = useState<number>(0)
  const navigate = useNavigate()

  let uslugaId = useRef<number>(0)
  let voziloId = useRef<number>(0)
  let popust = useRef<number>(0)
  let uvecanje = useRef<number>(0)
  let placeno: boolean = false

  useEffect(() => {
    axios.get<Usluga[]>('http://localhost:8000/usluge', headers())
      .then(res => {
        setUsluge(res.data)
        axios.get<Vozilo[]>('http://localhost:8000/vozila', headers())
          .then(res => {
            console.log(res.data)
            setVozila(res.data)
          }) 
      })
  }, [])

  const add = (event: FormEvent<HTMLFormElement>): void => {
    
    event.preventDefault()

    if (uslugaId.current == 0 || voziloId.current == 0 || cenaUsluge == undefined || placeno == undefined) {
      alert('Sva polja moraju biti popunjena!')
      return
    }

    if (cenaUsluge <= 0) {
      alert('Neispravna cena.')
      return
    }

    axios.post(`http://localhost:8000/pruzene-usluge`, {
        uslugaId: uslugaId.current,
        voziloId: voziloId.current,
        cena: cenaUsluge,
        placeno: placeno
    }, headers())
      .then(response => {
          navigate('/pruzene-usluge')
      })
      .catch(error => {
          alert(error.response.data.message)
      })
  }

  const calculatePopust = () => {
    setCenaUsluge(cenaUsluge - (cenaUsluge * popust.current / 100))
  }

  const calculateUvecanje = () => {
    setCenaUsluge(cenaUsluge + (cenaUsluge * uvecanje.current / 100))
  }


  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={add}>
        <Form.Group className="mb-3" controlId="usluga">
          <Form.Label>Usluga</Form.Label>
          <Form.Select onChange={event => {
              uslugaId.current = +event.target.value; 
              let usluga = (usluge[+event.target.value - 1])
              usluga != undefined ? setCenaUsluge(usluga.cena) : setCenaUsluge(0)
            }}>
            <option value={0}>Izaberite</option>
            {usluge.map(usluga => 
              <option value={usluga.id}>{usluga.name + ' - ' + usluga.cena + ' rsd'}</option>)
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="vozilo">
          <Form.Label>Vozilo</Form.Label>
          <Form.Select onChange={event => voziloId.current = +event.target.value}>
            <option value={0}>Izaberite</option>
            {vozila.map(vozilo => 
              <option value={vozilo.id}>{`
                (${vozilo.id}) 
                ${vozilo.model.name} - 
                ${vozilo.korisnik.first_name} 
                ${vozilo.korisnik.last_name}`}
              </option>)
            }
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3" controlId="cena">
          <Form.Label>Cena</Form.Label>
          <Form.Control 
            type="text"
            value={cenaUsluge}
            onChange={event => {setCenaUsluge(+event.target.value)}}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="popust">
          <Form.Label>Popust(%)</Form.Label>
          <Form.Control 
            type="text"
            onChange={event => popust.current = +event.target.value}/>
          <Button className='mt-1' onClick={() => calculatePopust()}>Izracunaj</Button>
        </Form.Group>
        <Form.Group className="mb-3" controlId="popust">
          <Form.Label>Uvecanje(%)</Form.Label>
          <Form.Control 
            type="text"
            onChange={event => uvecanje.current = +event.target.value}/>
          <Button className='mt-1' onClick={() => calculateUvecanje()}>Izracunaj</Button>
        </Form.Group>


        <Button variant="primary" type="submit">
          Dodaj
        </Button>
      </Form>
    </Row>
  )
}

export default AddPruzenaUsluga