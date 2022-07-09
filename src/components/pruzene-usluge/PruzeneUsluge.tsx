import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'
import { Usluga } from '../usluge/Usluge'
import { Model } from '../modeli/Modeli'
import { Korisnik } from '../korisnici/Korisnici'

export interface Vozilo {
  id: number,
  tip_goriva: string,
  tip_menjaca: string,
  broj_registracije: number,
  broj_sasije: number,
  broj_motora: number,
  boja: string,
  model: Model,
  korisnik: Korisnik
}

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
          <td>{usluga.vozilo.model.proizvodjac.name + ' ' + usluga.vozilo.model.name}</td>
          <td>{usluga.vozilo.korisnik.first_name + ' ' + usluga.vozilo.korisnik.last_name}</td>
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
          <td>Prihod: {ukupno} | Dugovanja: {dugovanja}</td>
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