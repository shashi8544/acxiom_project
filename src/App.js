import React,{useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import {store} from './Reducers/stores'
import Home from './pages/Home/Home';
import InterIIT from './pages/InterIIT/interIITSelection'; // Remove this import if it's already imported elsewhere
import Tour from './pages/Tour/Tour';
import Achieve from './pages/Achieve/Achieve';
import JoinTournament from './pages/JoinTournament/JoinTournament';
import CreateTournament from './pages/CreateTournament/CreateTournament';
import AppliedTournament from './pages/AppliedTournament/AppliedTournament';
import BasketballPage from './pages/Home/Games/Basketball/Basketball';
import VolleyballPage from './pages/Home/Games/Volleyball/Volleyball';
import BadmintonPage from './pages/Home/Games/Badminton/Badminton';
import AthletePage from './pages/Home/Games/Athlete/Athlete';
import FootballPage from './pages/Home/Games/Football/Football';
import ChessPage from './pages/Home/Games/Chess/Chess';
import CricketPage from './pages/Home/Games/Chess/Chess'; // Is this correct?
import EventPage from './pages/Home/Event/EventPage';
import Rules from './pages/Home/Rules/Rules';
import Facilities from './pages/Home/Facilities/Facilities';
import Coordinator from './pages/Home/Coordinator/coordinators';
import Coaches from './pages/Home/Coaches/coaches';
import SelectedStudentsForInterIIT from './pages/InterIIT/StudentSelectedForInterIIT/StudentSelectedForInterIIT';
import { fetchAdminStatus } from './action/authenticationAction';
const App = () => {
  
  return (
    <Router >
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/interiit/*" element={<InterIIT />} />
        <Route path="/tour" element={<Tour />} />
        <Route path="/joinTournament" element={<JoinTournament />} />
        <Route path="/createTournament" element={<CreateTournament />} />
        <Route path="/appliedTournament" element={<AppliedTournament />} />
        <Route path="/achieve" element={<Achieve />} />
        <Route path="/Basketball" element={<BasketballPage />} />
        <Route path="/Volleyball" element={<VolleyballPage />} />
        <Route path="/Badminton" element={<BadmintonPage />} />
        <Route path="/Athlete" element={<AthletePage />} />
        <Route path="/Football" element={<FootballPage />} />
        <Route path="/Chess" element={<ChessPage />} />
        <Route path="/Cricket" element={<CricketPage />} /> {/* Correct path? */}
        <Route path="/athlete/events/:documentID" element={<EventPage />} />
        <Route path="/basketball/events/:documentID" element={<EventPage />} />
        {/* Add more event routes here */}
        <Route path="/basketball/rules/:documentID" element={<Rules />} />
        {/* Add more rules routes here */}
        <Route path="/basketball/facilities/:documentID" element={<Facilities />} />
        {/* Add more facilities routes here */}
        <Route path="/basketball/coordinators/:documentID" element={<Coordinator />} />
        {/* Add more coordinator routes here */}
        <Route path="/basketball/coaches/:documentID" element={<Coaches />} />
        {/* Add more coaches routes here */}
        <Route path="/interiit/Selected-Student" element={<SelectedStudentsForInterIIT />} />
        {/* Add more routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
