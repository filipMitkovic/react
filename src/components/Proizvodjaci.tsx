import React, { FC, useContext, useState } from 'react'
import { useEffect } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../Axios'

interface Proizvodjac {
  id: number,
  name: string
}


const Proizvodjaci: FC = () => {

  const [proizvodjaci, setProizvodjaci] = useState<Proizvodjac[]>([])

  useEffect(() => {
    axios.get<Proizvodjac[]>('http://localhost:8000/proizvodjaci', headers()).
      then(res => {
        setProizvodjaci(res.data)
      })
  }, [])

  const deleteProizvodjac = (id: number): void => {
    console.log(id)
  }

  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {
          proizvodjaci.map(proizvodjac => 
            <tr key={proizvodjac.id}>
              <td>{proizvodjac.id}</td>
              <td>{proizvodjac.name}</td>
              <td><Button variant='danger' onClick={() => deleteProizvodjac(proizvodjac.id)}>Delete</Button></td>
            </tr>)
        }
      </tbody>
    </Table>
  )
}

export default Proizvodjaci