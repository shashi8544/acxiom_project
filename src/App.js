import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Sports from './pages/Sports/Sports';
import Tour from './pages/Tour/Tour';
import Achieve from './pages/Achieve/Achieve';

import './App.css';


const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
           
          <Route path='/' element={<Home/>} />
          <Route path="/home" element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          <Route path='/tour' element={<Tour/>} />
          <Route path='/achieve' element={<Achieve/>} />


        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
