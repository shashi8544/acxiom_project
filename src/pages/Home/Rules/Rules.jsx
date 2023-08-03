import React from 'react';
import Navbar from '../../../components/Navbar/Navbar';
import './Rules.css';

const Rules = () => {
  return (
    <div>
      <Navbar />

      <div id="content">
        <h2>Rules</h2>
        <div className="rules-container">
          <h3>Rule 1</h3>
          <p>[Respect Your Opponent]</p>
        </div>

        <div className="rules-container">
          <h3>Rule 2</h3>
          <p>[Don't Argue with the referee]</p>
        </div>

        <div className="rules-container">
          <h3>Rule 3</h3>
          <p>[Take Health and Safety Seriously]</p>
        </div>
      </div>

      <div id="footer">
        <p>&copy; www.sportiitp.com.</p>
      </div>
    </div>
  );
}

export default Rules;
