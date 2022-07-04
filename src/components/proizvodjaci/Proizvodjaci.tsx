import React, { FC, useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'

export interface Proizvodjac {
  id: number,
  name: string
}


const Proizvodjaci: FC = () => {

  const [proizvodjaci, setProizvodjaci] = useState<Proizvodjac[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<Proizvodjac[]>('http://localhost:8000/proizvodjaci', headers())
      .then(res => {
        setProizvodjaci(res.data)
      }) 
  }

  const deleteProizvodjac = (id: number): void => {
    axios.delete(`http://localhost:8000/proizvodjaci/${id}`, headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data)
      })
  }

  return (
    <>
    <Button className='mb-3' onClick={() => navigate('/proizvodjaci/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {proizvodjaci.map(proizvodjac => <tr key={proizvodjac.id}>
          <td>{proizvodjac.id}</td>
          <td onClick={() => navigate(`/proizvodjaci/edit/${proizvodjac.id}`)}>{proizvodjac.name}</td>
          <td><Button variant='danger' onClick={() => deleteProizvodjac(proizvodjac.id)}>Delete</Button></td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default Proizvodjaci