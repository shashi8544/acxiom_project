import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './coordinators.css';

const Coordinator = () => {
  return (
    <div>
      <Navbar />

      <div id="content">
        <h2>Coordinators</h2>
        <div className="coordinators-container">
          <h3>Overall Coordinator</h3>
          <p>Name: [Coordinator Name]</p>
          <p>Email: [Coordinator Email]</p>
          <p>Contact: [Coordinator Contact]</p>
        </div>

        <div className="coordinators-container">
          <h3>Specific Game Coordinator</h3>
          <p>Name: [Coordinator Name]</p>
          <p>Email: [Coordinator Email]</p>
          <p>Contact: [Coordinator Contact]</p>
        </div>

        <div className="coordinators-container">
          <h3>Sub-coordinator</h3>
          <p>Name: [Coordinator Name]</p>
          <p>Email: [Coordinator Email]</p>
          <p>Contact: [Coordinator Contact]</p>
        </div>
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
}

export default Coordinator;
