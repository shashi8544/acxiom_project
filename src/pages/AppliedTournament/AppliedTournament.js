import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './AppliedTournament.css';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import firebase from '../../utils/configs/firebaseConfig';
import { fetchUserJoinedTournamentsFromBackend } from '../../action/joinTourAction';

const firestore = firebase.firestore();

const AppliedTournament = () => {
  const [myTournaments, setMyTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.auth.userData);

  useEffect(() => {
    // Fetch the data when the component mounts
    if (user) {
      fetchUserJoinedTournamentsFromBackend(user.uid)
        .then((data) => {
          console.log('appliedData', data);
          setMyTournaments(data);
          setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          setLoading(false);
        });
    }
  }, [user]); // Reload the data whenever user changes

  if (!user) {
    return (
      <div>
        <Navbar />
        <p>Please Sign In to view your team details</p>
      </div>
    );
  }

  return (
    <div>
      <Navbar />
      <br />
      <div className="joinBackForward">
        <Link to="/tour">
          <span>Tournament</span>
        </Link>
        <span>&nbsp;&nbsp;</span>
        <span>&gt;</span>
        <span>&nbsp;&nbsp;</span>
        <span>Applied</span>
      </div>

      <div className="tournamentCardsContainer">
        {myTournaments.map((achievement, index) => (
          <div className="achieve-card" key={index}>
            <div className="inner-achieve-card">
              <div className="tournament-Name">
                <h1>{achievement[0].teamName}</h1>
              </div>
              <div className="event-Description">
                <p>Captain: {achievement[0].captainName}</p>
                <p>Players: {achievement[0].players.join(', ')}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AppliedTournament;
