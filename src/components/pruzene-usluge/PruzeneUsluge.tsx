import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button, Row, Col } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'
import { Usluga } from '../usluge/Usluge'
import { Model } from '../modeli/Modeli'
import { Korisnik } from '../korisnici/Korisnici'
import { Vozilo } from '../vozila/Vozila'


export interface PruzenaUsluga {
    id: number,
    cena: number,
    placeno: boolean,
    usluga: Usluga,
    vozilo: Vozilo
}

const PruzeneUsluge = () => {

  const [usluge, setUsluge] = useState<PruzenaUsluga[]>([])
  const [ukupno, setUkupno] = useState<number>(0)
  const [dugovanja, setDugovanja] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<PruzenaUsluga[]>('http://localhost:8000/pruzene-usluge', headers())
      .then(res => {
        let pruzeneUsluge: PruzenaUsluga[] = res.data as PruzenaUsluga[]
        setUsluge(pruzeneUsluge)
        let sum = pruzeneUsluge
          .map(p => p.placeno ? p.cena : 0)
          .reduce((previous, current) => previous + current, 0)
        let dugovanja = pruzeneUsluge
          .map(p => p.placeno ? 0 : p.cena)
          .reduce((previous, current) => previous + current, 0)
        setUkupno(sum)
        setDugovanja(dugovanja)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchForUser = (id: number) => {
    axios.get<PruzenaUsluga[]>(`http://localhost:8000/pruzene-usluge/istorija/korisnik/${id}`, headers())
      .then(res => {
        let pruzeneUsluge: PruzenaUsluga[] = res.data as PruzenaUsluga[]
        setUsluge(pruzeneUsluge)
        let sum = pruzeneUsluge
          .map(p => p.placeno ? p.cena : 0)
          .reduce((previous, current) => previous + current, 0)
        let dugovanja = pruzeneUsluge
          .map(p => p.placeno ? 0 : p.cena)
          .reduce((previous, current) => previous + current, 0)
        setUkupno(sum)
        setDugovanja(dugovanja)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const fetchForVozilo = (id: number) => {
    axios.get<PruzenaUsluga[]>(`http://localhost:8000/pruzene-usluge/istorija/vozilo/${id}`, headers())
      .then(res => {
        let pruzeneUsluge: PruzenaUsluga[] = res.data as PruzenaUsluga[]
        setUsluge(pruzeneUsluge)
        let sum = pruzeneUsluge
          .map(p => p.placeno ? p.cena : 0)
          .reduce((previous, current) => previous + current, 0)
        let dugovanja = pruzeneUsluge
          .map(p => p.placeno ? 0 : p.cena)
          .reduce((previous, current) => previous + current, 0)
        setUkupno(sum)
        setDugovanja(dugovanja)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const platiUslugu = (id: number): void => {
    axios.put(`http://localhost:8000/pruzene-usluge/placanje/${id}`, {} ,headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data.message)
      })
  }

  return (
    <>
    <Row>
      <Col md={1}>
        <Button onClick={() => fetchData()}>Sve</Button>
      </Col>
    </Row>
    <Button className='mb-3' onClick={() => navigate('/pruzene-usluge/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Usluga</th>
          <th>Cena</th>
          <th>Vozilo</th>
          <th>Korisnik</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {usluge.map(usluga => <tr key={usluga.id} className={usluga.placeno ? 'table-success' : 'table-danger'}>
          <td>{usluga.id}</td>
          <td>{usluga.usluga.name + ' (' + usluga.usluga.cena + ' rsd)'}</td>
          <td>{usluga.cena + ' rsd'}</td>
          <td onClick={() => fetchForVozilo(usluga.vozilo.id)}>{usluga.vozilo.model.proizvodjac.name + ' ' + usluga.vozilo.model.name}</td>
          <td onClick={() => fetchForUser(usluga.vozilo.korisnik.id)}>{usluga.vozilo.korisnik.first_name + ' ' + usluga.vozilo.korisnik.last_name}</td>
          <td><Button 
            variant='success' 
            className={usluga.placeno ? 'disabled' : ''} 
            onClick={() => platiUslugu(usluga.id)}>
              {usluga.placeno ? 'Placeno' : 'Plati'}
            </Button>
          </td>
        </tr>)}
        <tr className='table-warning'>
          <td>Total</td>
          <td></td>
          <td><pre><h5 className='text-success'>Prihod: {ukupno}</h5><h5 className='text-danger'>Dugovanja: {dugovanja}</h5></pre></td>
          <td></td>
          <td></td>
          <td></td>
        </tr>
      </tbody>
    </Table>
    </>
  )
}

export default PruzeneUsluge