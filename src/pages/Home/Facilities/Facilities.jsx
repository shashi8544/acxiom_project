import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './Facilities.css';

const Facilities = () => {
  return (
    <div>
      <Navbar />

      <div id="content">
        <h2>Facilities</h2>
        <div className="facilities-container">
          <h3>1. Ground Opening Time</h3>
          <ul className="facilities-list">
            <li>Gymkhana ground: 6AM to 2AM</li>
            <li>Wear proper shoes type for your ground type</li>
            <li>Keep ground clean</li>
          </ul>
        </div>

        <div className="facilities-container">
          <h3>2. About Equipments</h3>
          <ul className="facilities-list">
            <li>Each games are provided by Gymkhana</li>
            <li>Students are allowed to bring their own Equipments</li>
          </ul>
        </div>

        <div className="facilities-container">
          <h3>3. About Light</h3>
          <ul className="facilities-list">
            <li>There are four flood lights for late night practices</li>
          </ul>
        </div>
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
}

export default Facilities;
