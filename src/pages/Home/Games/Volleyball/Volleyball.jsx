import React from 'react';
import Navbar from '../../../../components/Navbar/Navbar';
import Event from '../../Event/EventPage';
import Rules from '../../Rules/Rules';
import Facilities from '../../Facilities/Facilities';
import Coordinator from '../../Coordinator/coordinators';
import Coaches from '../../Coaches/coaches';
import { Link } from 'react-router-dom';
import {getDataIntoFirebase, getHomePageBasketballAttribute } from '../../../../action/homePagesGamesAttributeAction';
import '../../Games/style.css'
  let handleData ;
  function fetchDataFromBackend() {
    getHomePageBasketballAttribute()
      .then((data) => {
        if (data) {
          handleData = data;
          console.log(handleData);
            // You can store the data in a variable here
            const { Coach, Coordinators, Achievements, Events } = data;
        console.log(typeof Coach);
        // Now you can access each part of the data using the variables Coach, Coordinators, Achievements, and Events
        console.log("Coach:", Coach);
        console.log("Coordinators:", Coordinators);
        console.log("Achievements:", Achievements);
        console.log("Events:", Events);
            
          // console.log("Fetched data:", data);
          // You can process the fetched data here
        } else {
          console.log("No data found.");
        }
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        // Handle the error if needed
      });
  }
  fetchDataFromBackend();
  
const VolleyballPage = () => {
  const documentID = 'Volleyball';
  return (
    <div>
      
      <Navbar/>

      <div id="content">
        <h2>Welcome to the volleyball Page!</h2>
        <p>This page is dedicated to everything volleyball.</p>
        <p>Here you will find information about volleyball teams, players, and upcoming events.</p>
      </div>

      <div className="grid-container">
        <div className="grid-item">
          <h3>Events</h3>
          <p>Stay updated with the latest volleyball events and tournaments.</p>
          
          <button><Link to={`/volleyball/events/${documentID}`}>View Events</Link></button>
        </div>
        <div className="grid-item">
          <h3>Rules</h3>
          <p>Learn about the rules and regulations of volleyball.</p>
          <button><Link to={`/volleyball/rules/${documentID}`}>View Rules</Link></button>
        </div>
        <div className="grid-item">
          <h3>Achievement</h3>
          <p>Explore the achievements of volleyball teams.</p>
          <button>View Achievements</button>
        </div>
        <div className="grid-item">
          <h3>Facilities</h3>
          <p>Explore the profiles and facilities of volleyball teams.</p>
          <button><Link to={`/volleyball/facilities/${documentID}`}>View Facilities</Link></button>
        </div>
        <div className="grid-item">
          <h3>Coach</h3>
          <p>Know the profiles Coach of volleyball teams.</p>
          <button><Link to={`/volleyball/coaches/${documentID}`}>Coachs</Link></button>
        </div>
        <div className="grid-item">
          <h3>Coordinators</h3>
          <p>For any information coordinators.</p>
          <button><Link to={`/volleyball/coordinators/${documentID}`}>Coordinators</Link></button>
        </div>
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
}

export default VolleyballPage;
