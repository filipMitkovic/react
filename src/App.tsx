import React, { useState, createContext, useEffect } from 'react';
import './App.css';
import Header from './components/Header';
import { Row, Container} from "react-bootstrap";
import Login from "./components/Login";
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom'
import Proizvodjaci from './components/proizvodjaci/Proizvodjaci';
import Modeli from './components/modeli/Modeli';
import ProtectedRoute from './components/ProtectedRoute';
import AddProizvodjac from './components/proizvodjaci/AddProizvodjac';
import EditProizvodjac from './components/proizvodjaci/EditProizvodjac';
import Usluge from './components/usluge/Usluge';
import AddUsluga from './components/usluge/AddUsluga';
import EditUsluga from './components/usluge/EditUsluga';
import PruzeneUsluge from './components/pruzene-usluge/PruzeneUsluge';
import AddPruzenaUsluga from './components/pruzene-usluge/AddPruzenaUsluga';
import Korisnici from './components/korisnici/Korisnici';
import AddModel from './components/modeli/AddModel';
import EdtiModel from './components/modeli/EdtiModel';
import AddKorisnik from './components/korisnici/AddKorisnik';
import EditKorisnik from './components/korisnici/EditKorisnik';
import Vozila from './components/vozila/Vozila';
import AddVozilo from './components/vozila/AddVozilo';
import EditVozilo from './components/vozila/EditVozilo';

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
                <Route path="/" element={<ProtectedRoute><PruzeneUsluge/></ProtectedRoute>} />
                <Route path="/login" element={<Login/>} />
                <Route path="/pruzene-usluge" element={<ProtectedRoute><PruzeneUsluge/></ProtectedRoute>} ></Route>
                <Route path="/pruzene-usluge/add" element={<ProtectedRoute><AddPruzenaUsluga/></ProtectedRoute>} ></Route>
                <Route path="/proizvodjaci" element={<ProtectedRoute><Proizvodjaci/></ProtectedRoute>} ></Route>
                <Route path="/proizvodjaci/add" element={<ProtectedRoute><AddProizvodjac/></ProtectedRoute>} ></Route>
                <Route path="/proizvodjaci/edit/:id" element={<ProtectedRoute><EditProizvodjac/></ProtectedRoute>} ></Route>
                <Route path="/usluge" element={<ProtectedRoute><Usluge/></ProtectedRoute>} ></Route>
                <Route path="/usluge/add" element={<ProtectedRoute><AddUsluga/></ProtectedRoute>} ></Route>
                <Route path="/usluge/edit/:id" element={<ProtectedRoute><EditUsluga/></ProtectedRoute>} ></Route>
                <Route path='/modeli' element={<ProtectedRoute><Modeli/></ProtectedRoute>} ></Route>
                <Route path='/modeli/add' element={<ProtectedRoute><AddModel/></ProtectedRoute>} ></Route>
                <Route path='/modeli/edit/:id' element={<ProtectedRoute><EdtiModel/></ProtectedRoute>} ></Route>
                <Route path='/korisnici' element={<ProtectedRoute><Korisnici/></ProtectedRoute>} ></Route>
                <Route path='/korisnici/add' element={<ProtectedRoute><AddKorisnik/></ProtectedRoute>} ></Route>
                <Route path='/korisnici/edit/:id' element={<ProtectedRoute><EditKorisnik/></ProtectedRoute>} ></Route>
                <Route path='/vozila' element={<ProtectedRoute><Vozila/></ProtectedRoute>} ></Route>
                <Route path='/vozila/add' element={<ProtectedRoute><AddVozilo/></ProtectedRoute>} ></Route>
                <Route path='/vozila/edit/:id' element={<ProtectedRoute><EditVozilo/></ProtectedRoute>} ></Route>
              </Routes>
            </Container>
        </UserContext.Provider>
      </div>
    </Router>
  );
}

export default App;
