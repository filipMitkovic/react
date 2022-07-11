import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'
import { Korisnik } from '../korisnici/Korisnici'
import { Model } from '../modeli/Modeli'

export interface Vozilo {
  id: number,
  tip_goriva: string,
  tip_menjaca: string,
  broj_registracije: number,
  broj_sasije: number,
  broj_motora: number,
  boja: string,
  model: Model,
  korisnik: Korisnik,
  modelId: number,
  korisnikId: number
}

const Vozila = () => {

  const [vozila, setVozila] = useState<Vozilo[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<Vozilo[]>('http://localhost:8000/vozila', headers())
      .then(res => {
        setVozila(res.data)
      }) 
  }

  const deleteVozilo = (id: number): void => {
    axios.delete(`http://localhost:8000/vozila/${id}`, headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data)
      })
  }


  return (
    <>
    <Button className='mb-3' onClick={() => navigate('/vozila/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Model</th>
          <th>Korisnik</th>
          <th>Tip goriva</th>
          <th>Tip menjaca</th>
          <th>Broj sasije</th>
          <th>Broj motora</th>
          <th>Broj registracije</th>
          <th>Boja</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {vozila.map(vozilo => <tr key={vozilo.id}>
          <td>{vozilo.id}</td>
          <td onClick={() => navigate(`/vozila/edit/${vozilo.id}`)}>{vozilo.model.name}</td>
          <td>{`${vozilo.korisnik.first_name} ${vozilo.korisnik.last_name}`}</td>
          <td>{vozilo.tip_goriva}</td>
          <td>{vozilo.tip_menjaca}</td>
          <td>{vozilo.broj_sasije}</td>
          <td>{vozilo.broj_motora}</td>
          <td>{vozilo.broj_registracije}</td>
          <td>{vozilo.boja}</td>
          <td><Button variant='danger' onClick={() => deleteVozilo(vozilo.id)}>Delete</Button></td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default Vozila