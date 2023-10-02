import React, { useEffect, useState } from 'react';
import firebase from '../../utils/configs/firebaseConfig'; // Adjust the path to your Firebase config
import Navbar from '../../components/Navbar/Navbar';
import { getAchivementDataList } from '../../action/achivementAction';
import './Achieve.css'
const firestore = firebase.firestore();
const AchievementList = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading,setLoading] = useState(true);
  useEffect(() => {
    // Fetch the data when the component mounts
    getAchivementDataList()
      .then((data) => {
        setAchievements(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  return (
    <div>
      <Navbar/>
      {achievements.map((achievement) => (
        <div className='achieve-card' key = {achievement.id} >
          <div className='inner-achieve-card'>
            <div className='tournament-Name'>
              <h1>{achievement.eventName}</h1>
            </div>
            <div className='event-image'>
              <img src={achievement.endImageUrl} alt='Achievement' />
            </div>
            <div className='event-Description'>{achievement.endDescription}</div>
            <div className='event-selectedSports'>Game:- {achievement.selectedSport}</div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AchievementList;
