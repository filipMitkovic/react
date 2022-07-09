import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'

export interface Usluga {
  id: number,
  name: string,
  cena: number
}

const Usluge = () => {

  const [usluge, setUsluge] = useState<Usluga[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<Usluga[]>('http://localhost:8000/usluge', headers())
      .then(res => {
        setUsluge(res.data)
      }) 
  }

  const deleteUsluga = (id: number): void => {
    axios.delete(`http://localhost:8000/usluge/${id}`, headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data)
      })
  }


  return (
    <>
    <Button className='mb-3' onClick={() => navigate('/usluge/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Cena</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {usluge.map(usluga => <tr key={usluga.id}>
          <td>{usluga.id}</td>
          <td onClick={() => navigate(`/usluge/edit/${usluga.id}`)}>{usluga.name}</td>
          <td>{usluga.cena}</td>
          <td><Button variant='danger' onClick={() => deleteUsluga(usluga.id)}>Delete</Button></td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default Usluge