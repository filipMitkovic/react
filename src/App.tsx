import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Row, Container} from "react-bootstrap";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Proizvodjaci from './components/proizvodjaci/Proizvodjaci';
import Modeli from './components/Modeli';
import Klijenti from './components/klijenti/Klijenti';
import Home from './components/Home';
import ProtectedRoute from './components/ProtectedRoute';
import AddProizvodjac from './components/proizvodjaci/AddProizvodjac';
import EditProizvodjac from './components/proizvodjaci/EditProizvodjac';

export interface User {
  email: string,
  password: string
}

export const UserContext = createContext({} as any)

function App() {

  const [user, setUser] = useState<User | null>(null)


  useEffect(() => {
    let email = localStorage.getItem('email')
    if (email) {
      setUser({email: email, password: ''})
    }
  }, [])


  return (
    <Router>
      <div className="App">
        <UserContext.Provider value={{user, setUser}}>
          <Header></Header>
            <Container className="mt-5 text-center" >
              <Routes>
                <Route path="/" element={<Home/>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/proizvodjaci" element={<ProtectedRoute><Proizvodjaci/></ProtectedRoute>} ></Route>
                <Route path="/proizvodjaci/add" element={<ProtectedRoute><AddProizvodjac/></ProtectedRoute>} ></Route>
                <Route path="/proizvodjaci/edit/:id" element={<ProtectedRoute><EditProizvodjac/></ProtectedRoute>} ></Route>
                <Route path='/modeli' element={<ProtectedRoute><Modeli/></ProtectedRoute>} ></Route>
                <Route path='/klijenti' element={<ProtectedRoute><Klijenti/></ProtectedRoute>} ></Route>
              </Routes>
            </Container>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
