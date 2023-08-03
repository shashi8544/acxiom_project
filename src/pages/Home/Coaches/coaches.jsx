import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './coaches.css';

const Coaches = () => {
  return (
    <div>
      <Navbar />

      <div id="content">
        <h2>Coaches</h2>
        <div className="coaches-container">
          <h3>Coach 1</h3>
          <p>Name: [Coach 1 Name]</p>
          <p>Email: [Coach 1 Email]</p>
          <p>Contact: [Coach 1 Contact]</p>
        </div>

        <div className="coaches-container">
          <h3>Coach 2</h3>
          <p>Name: [Coach 2 Name]</p>
          <p>Email: [Coach 2 Email]</p>
          <p>Contact: [Coach 2 Contact]</p>
        </div>

        <div className="coaches-container">
          <h3>Coach 3</h3>
          <p>Name: [Coach 3 Name]</p>
          <p>Email: [Coach 3 Email]</p>
          <p>Contact: [Coach 3 Contact]</p>
        </div>
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
}

export default Coaches;
