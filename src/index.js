import * as React from "react";
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";
import Home from "./pages/Home/Home";
import InterIIT from "./pages/InterIIT/interIITSelection";
import Achieve from "./pages/Achieve/Achieve";
import Tour from "./pages/Tour/Tour"
import JoinTournament from "./pages/JoinTournament/JoinTournament";
import CreateTournament from "./pages/CreateTournament/CreateTournament";
import AppliedTournament from "./pages/AppliedTournament/AppliedTournament";
import BasketballPage from './pages/Home/Games/Basketball/Basketball';
import VolleyballPage from "./pages/Home/Games/Volleyball/Volleyball";
import BadmintonPage from "./pages/Home/Games/Badminton/Badminton";
import AthletePage from "./pages/Home/Games/Athlete/Athlete";
import FootballPage from "./pages/Home/Games/Football/Football";
import ChessPage from "./pages/Home/Games/Chess/Chess";
import CricketPage from "./pages/Home/Games/Chess/Chess";
import EventPage from "./pages/Home/Event/EventPage";
import Rules from "./pages/Home/Rules/Rules";
import Facilities from "./pages/Home/Facilities/Facilities";
import Coordinator from "./pages/Home/Coordinator/coordinators";
import Coaches from "./pages/Home/Coaches/coaches";
import SelectedStudentsForInterIIT from './pages/InterIIT/StudentSelectedForInterIIT/StudentSelectedForInterIIT';
const router = createBrowserRouter([
  {
    path: "/",
    element: <Home/>,
  },
  {
    path: "/home",
    element : <Home/>,
  },
  {
    path: "/interiit",
    element : <InterIIT/>,
  },
  {
    path: "/tour",
    element : <Tour/>,
  },
  {
    path: "/joinTournament",
    element : <JoinTournament/>,
  },
  {
    path: "/createTournament",
    element : <CreateTournament/>,
  },
  {
    path: "/appliedTournament",
    element : <AppliedTournament/>,
  },
  {
    path: "/achieve",
    element : <Achieve/>,
  },
  {
    path: "/Basketball",
    element : <BasketballPage />,
  },
  {
    path: "/Volleyball",
    element : <VolleyballPage/>
  },
  {
    path: "/Badminton",
    element : <BadmintonPage/>
  },
  {
    path: "/Athlete",
    element : <AthletePage/>
  },
  {
    path: "/Football",
    element : <FootballPage/>
  },
  {
    path: "/Chess",
    element : <ChessPage/>
  },
  {
    path: "/Cricket",
    element : <CricketPage/>
  },
  {
    path: "/athlete/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/basketball/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/badminton/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/chess/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/cricket/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/football/events/:documentID",
    element : <EventPage/>
  },
  {
    path: "/volleyball/events/:documentID",
    element : <EventPage/>
  },  
  {
    path: "/basketball/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/athlete/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/badminton/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/chess/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/cricket/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/football/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/volleyball/rules/:documentID",
    element : <Rules/>
  },
  {
    path: "/basketball/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/athlete/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/badminton/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/chess/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/cricket/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/football/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/volleyball/facilities/:documentID",
    element : <Facilities/>
  },
  {
    path: "/basketball/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/athlete/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/badminton/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/chess/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/cricket/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/football/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/volleyball/coordinators/:documentID",
    element : <Coordinator/>
  },
  {
    path: "/basketball/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/badminton/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/athlete/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/chess/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/cricket/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/football/coaches/:documentID",
    element : <Coaches/>
  },
  {
    path: "/volleyball/coaches/:documentID",
    element : <Coaches/>
  },

  // InterIIT
  {
    path: "/interiit/Selected-Student",
    element : <SelectedStudentsForInterIIT/>
  },
]);

createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} />
);