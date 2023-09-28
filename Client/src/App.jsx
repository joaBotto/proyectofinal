// App.js
import React from 'react';
import { Route, Routes, useLocation  } from "react-router-dom"
import Navbar from './components/NavBar/NavBar';
import Footer from './components/Footer/Footer';
import Cards from './components/Cards/Cards';
import Form from './components/Form/formPostProperty';

function App() {
        return (
            <div>
            <Navbar />
            <Routes>
            <Route exact path="/home" element={<Home />}/>
              <Route path="/" element={<Cards />} />
              {/* Agrega la ruta para el formulario */}
              <Route path="/Form" element={<Form />} />
            </Routes>
            <Footer />
          </div>
        );
      }
export default App;