import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './AppliedTournament.css';
import { Link,useNavigate  } from 'react-router-dom';
import firebase from "../../utils/configs/firebaseConfig";
import { createdTournamentList } from "../../action/createTournamentAction";
const database = firebase.database();
const firestore = firebase.firestore();

const AppliedTournament = () => {
    const [tournaments, setTournaments] = useState([]);
    useEffect(() => {
      // Fetch the data when the component mounts
      createdTournamentList()
        .then((data) => {
          // Set the fetched data in the state
          setTournaments(data);
          console.log(data);
          // setLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          // setLoading(false);
        })
    }, []);
  useEffect(() => {
    fetchTournaments();
  }, []);

  const fetchTournaments = async () => {
    try {
      const tournamentsRef = firestore.collection('tournaments');
      const snapshot = await tournamentsRef.get();

      const tournamentData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setTournaments(tournamentData);
    } catch (error) {
      console.error('Error fetching tournaments:', error);
    }
  };

 

  return (
    <div>
      <Navbar />
      <br />
      <div className="joinBackForward">
        <Link to="/tour"><span>Tournament</span></Link>
        <span>&nbsp;&nbsp;</span>
        <span>&gt;</span>
        <span>&nbsp;&nbsp;</span>
        <span>Applied</span>
      </div>

      <div className="tournamentCardsContainer">
        {tournaments.map((tournament) => (
          <div key={tournament.id} className="tournamentCard">
            <div className='venue'> 
            <p>Venue: {tournament.venue}</p>
            </div>
            
            <div className='event-name'> 
            <h2>{tournament.eventName}</h2>
            </div>
            
            <div className='left-bottom'>
            <p>Sport Selected: {tournament.selectedSport}</p>
            <p>Event Type: {tournament.tournamentType}</p>
                 </div>
            <div className='date-time'>
            <p>Date: {tournament.date}</p>
            <p>Time: {tournament.time}</p>
                 </div>
            
           
           
            
            
          </div>
        ))}
      </div>

    </div>
  )
}

export default AppliedTournament
