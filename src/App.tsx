import React, { useState, createContext } from 'react';
import './App.css';
import Header from './components/Header';
import { Row, Container} from "react-bootstrap";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Proizvodjaci from './components/Proizvodjaci';
import Modeli from './components/Modeli';
import Klijenti from './components/Klijenti';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';

export interface User {
  username: string,
  password: string
}

export const UserContext = createContext({} as any)

function App() {

  const [user, setUser] = useState<User | null>(null)

  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{user, setUser}}>
          <Header></Header>
            <Container className="mt-5 text-center" >
              <Row md={4} className="mt-5 justify-content-center" >
                <Routes>
                  <Route path="/" element={<Home/>} />
                  <Route path="/login" element={<Login/>} />
                  <Route path="/proizvodjaci" element={<ProtectedRoute><Proizvodjaci/></ProtectedRoute>} ></Route>
                  <Route path='/modeli' element={<ProtectedRoute><Modeli/></ProtectedRoute>} ></Route>
                  <Route path='/klijenti' element={<ProtectedRoute><Klijenti/></ProtectedRoute>} ></Route>
                </Routes>
              </Row>
            </Container>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
