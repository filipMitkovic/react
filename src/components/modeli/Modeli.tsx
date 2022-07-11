import { useEffect, useState } from 'react'
import axios from 'axios'
import { Table, Button } from 'react-bootstrap'
import headers from '../../Axios'
import { useNavigate } from 'react-router-dom'
import { Proizvodjac } from '../proizvodjaci/Proizvodjaci'

export interface Model {
    id: number,
    name: string,
    proizvodjacId: number,
    proizvodjac: Proizvodjac
}


const Modeli = () => {

  const [modeli, setModeli] = useState<Model[]>([])
  const navigate = useNavigate()

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = (): void => {
    axios.get<Model[]>('http://localhost:8000/modeli', headers())
      .then(res => {
        setModeli(res.data)
      })
      .catch(err => {
        console.log(err)
      })
  }

  const deleteModel = (id: number): void => {
    axios.delete(`http://localhost:8000/modeli/${id}`, headers())
      .then(res => {
        fetchData()
      })
      .catch(err => {
        alert(err.response.data)
      })
  }

  return (
    <>
    <Button className='mb-3' onClick={() => navigate('/modeli/add')}>Dodaj</Button>
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Proizvodjac</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {modeli.map(model => <tr key={model.id}>
          <td>{model.id}</td>
          <td onClick={() => navigate(`/modeli/edit/${model.id}`)}>{model.name}</td>
          <td>{model.proizvodjac.name}</td>
          <td><Button variant='danger' onClick={() => deleteModel(model.id)}>Delete</Button></td>
        </tr>)}
      </tbody>
    </Table>
    </>
  )
}

export default Modeli