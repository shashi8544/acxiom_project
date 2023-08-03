import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home/Home';
import Sports from './pages/Sports/Sports';
import Tour from './pages/Tour/Tour';
import Achieve from './pages/Achieve/Achieve';

import './App.css';
import { Switch } from 'antd';
import JoinTournament from './pages/JoinTournament/JoinTournament';
import CreateTournament from './pages/CreateTournament/CreateTournament';
import AppliedTournament from './pages/AppliedTournament/AppliedTournament';
import BasketballPage from './pages/Home/Basketball';

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/sports" element={<Sports />} />
          
          <Switch>
          <Route exact path="/home" element={<Home />} />
          <Route path='/Basketball'>
              <BasketballPage/>
            </Route>
          </Switch>
          
          

          <Switch>
            <Route exact path='/tour'>
              <Tour />
            </Route>

            <Route path='/joinTournament'>
              <JoinTournament/>
            </Route>

            <Route path='/createTournament'>
              <CreateTournament/>
            </Route>

            <Route path='/appliedTournament'>
              <AppliedTournament/>
            </Route>
            

            
            {/* <Route path="/Basketball" element={<BasketballPage/>} /> */}

          </Switch>
          
          <Route path='/achieve' element={<Achieve />} />

        </Routes>




      </BrowserRouter>
    </div>
  )
}

export default App
