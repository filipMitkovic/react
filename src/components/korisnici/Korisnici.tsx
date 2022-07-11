import { FC, useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'

export interface Korisnik {
  id: number,
  first_name: string,
  last_name: string,
  phone: number
}

const Korisnici: FC = () => {

  const [korisnici, setKorisnici] = useState<Korisnik[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<Korisnik[]>('http://localhost:8000/korisnici', headers())
      .then(res => {
        setKorisnici(res.data)
      })
  }

  const deleteKorisnik = (id: number): void => {
    axios.delete(`http://localhost:8000/korisnici/${id}`, headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data)
      })
  }

  return (
    <>
    <Button className='mb-3' onClick={() => navigate('/korisnici/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Ime</th>
          <th>Prezime</th>
          <th>Telefon</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {korisnici.map(korisnik => <tr key={korisnik.id}>
          <td>{korisnik.id}</td>
          <td onClick={() => navigate(`/korisnici/edit/${korisnik.id}`)}>{korisnik.first_name}</td>
          <td onClick={() => navigate(`/korisnici/edit/${korisnik.id}`)}>{korisnik.last_name}</td>
          <td>{korisnik.phone}</td>
          <td><Button variant='danger' onClick={() => deleteKorisnik(korisnik.id)}>Delete</Button></td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default Korisnici