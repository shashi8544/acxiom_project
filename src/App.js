import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {store} from './Reducers/stores'
import Home from './pages/Home/Home';
import LoginType from './pages/LoginType/LoginType';
import Vendor from './pages/Vendor/Vendor';
import Axiomsuser from './pages/Axiomuser/Axiomuser'
import { fetchAdminStatus } from './action/authenticationAction';
const App = () => {
  
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/logintype" element={<LoginType/>} />
        <Route path="/vendor" element={<Vendor/>} />
        <Route path="/useraxiom" element={<Axiomsuser/>} />
        {/* <Route path="/joinTournament" element={<JoinTournament />} /> */}
        {/* <Route path="/interiit/*" element={<InterIIT />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/createTournament" element={<CreateTournament />} />
        <Route path="/appliedTournament" element={<AppliedTournament />} />
        <Route path="/achieve" element={<Achieve />} />
        <Route path="/Basketball" element={<BasketballPage />} />
        <Route path="/Volleyball" element={<VolleyballPage />} />
        <Route path="/Badminton" element={<BadmintonPage />} />
        <Route path="/Athlete" element={<AthletePage />} />
        <Route path="/Football" element={<FootballPage />} />
        <Route path="/Chess" element={<ChessPage />} /> */}
        {/* <Route path="/Cricket" element={<CricketPage />} />  */}
        
        {/* <Route path="/athlete/events/:documentID" element={<EventPage />} />
        <Route path="/basketball/events/:documentID" element={<EventPage />} /> */}
        {/* Add more event routes here */}
        {/* <Route path="/basketball/rules/:documentID" element={<Rules />} /> */}
        {/* Add more rules routes here */}
        {/* <Route path="/basketball/facilities/:documentID" element={<Facilities />} /> */}
        {/* Add more facilities routes here */}
        {/* <Route path="/basketball/coordinators/:documentID" element={<Coordinator />} /> */}
        {/* Add more coordinator routes here */}
        {/* <Route path="/basketball/coaches/:documentID" element={<Coaches />} /> */}
        {/* Add more coaches routes here */}
        {/* <Route path="/interiit/Selected-Student" element={<SelectedStudentsForInterIIT />} /> */}
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
