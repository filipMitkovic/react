import React, { FormEvent, useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate, useParams } from 'react-router-dom'
import headers from '../..//Axios'
import { Row, Form, Button } from 'react-bootstrap'
import { Model } from './Modeli'
import { Proizvodjac } from '../proizvodjaci/Proizvodjaci'


const EdtiModel = () => {

  const { id } = useParams()
  const [proizvodjaci, setProizvodjaci] = useState<Proizvodjac[]>([])
  const [model, setModel] = useState<Model>({} as Model)
  const navigate = useNavigate()

  useEffect(() => {
    axios.get<Model>(`http://localhost:8000/modeli/${id}`, headers())
      .then(res => {
        console.log(res.data)
        setModel(res.data)
        axios.get<Proizvodjac[]>('http://localhost:8000/proizvodjaci', headers())
          .then(res => {
            setProizvodjaci(res.data)
          })
      })
      .catch(err => {
        alert(err.response.data)
      })
  }, [])

  const edit = (event: FormEvent<HTMLFormElement>): void => {
      event.preventDefault()

      if (model == null || model?.name == '') {
        alert('Sva polja moraju biti popunjena!')
        return
      }
      
      axios.put(`http://localhost:8000/modeli/${model.id}`, {
        name: model.name,
        proizvodjacId: model.proizvodjacId
      }, headers())
        .then(res => {
          navigate('/modeli')
        })
        .catch(err => {
          alert(err.response.data)
        })
  }  

  return (
    <Row md={4} className="justify-content-center">
      <Form onSubmit={edit}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          <Form.Control 
            type="text"
            value={model.name}
            onChange={event => setModel({id: model.id, name: event.target.value, proizvodjac: {} as Proizvodjac, proizvodjacId: model.proizvodjacId})}/>
        </Form.Group>
        <Form.Group className="mb-3" controlId="proizvodjac">
          <Form.Label>Proizvodjac</Form.Label>
          <Form.Select onChange={event => model.proizvodjacId = +event.target.value}>
            {proizvodjaci.map(proizvodjac => 
              <option selected={model.proizvodjacId == proizvodjac.id} value={proizvodjac.id}>{proizvodjac.name}</option>)
            }
          </Form.Select>
        </Form.Group>

        <Button variant="primary" type="submit">
          Izmeni
        </Button>
      </Form>
    </Row>
  )
}

export default EdtiModel