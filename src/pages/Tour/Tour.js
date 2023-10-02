

import React from 'react'
import Navbar from '../../components/Navbar/Navbar';
import './Tour.css'
import { Link } from 'react-router-dom'
// import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import JoinTournament from '../';



const Tour = () => {
  // const handleJoinTournament = () =>{
  //   return(
  //     <JoinTournament/>
  //   )
  // }
  // const [redirect, setRedirect] = useState(false);
  // const handleClick = () => {
  //   // Perform any additional logic or actions here
  //   console.log('Container clicked!');
  //   setRedirect(true); // Set redirect to true to trigger the redirection
  // };
  // if (redirect) {

  //   return(

  //     <Router>
  //       <Switch>
  //       <Route exact path="/tour">
  //         {/* Your home page component */}
  //       </Route>
  //       <Route path="/other-page">
  //         {/* The component for the other page */}
  //       </Route>
  //     </Switch>
  //     </Router>

  //   ) 
  // }
  return (
    <>
      <Navbar />
      <div class="container">
        <section id="three parts">
          <h1 class="h-primary center">Games</h1>
          <div id="games">




            <Link to="/CreateTournament" className='createTourLinkButton'>
              <div class="box1 ">
                <h2 class="h-secondary center">Create a Tournament</h2>

              </div>
            </Link>

            <Link to="/JoinTournament" className='createTourLinkButton'>
              <div class="box2 " >

                <h2 class="h-secondary center" >Join a Tournament</h2>



              </div>
            </Link>


            <Link to="/AppliedTournament" className='createTourLinkButton'>
              <div class="box3 ">

                <h2 class="h-secondary center">Applied Tournament</h2>

              </div>
            </Link>


          </div>
        </section>
      </div>
    </>

  )
}

// import React, { useState } from 'react'
// import Navbar from '../../components/Navbar/Navbar';
// import './Tournament.css'
// import {addJoinTourProject} from '../../action/joinTourAction'
// const Tour = () => {
//   const MIN_PLAYER_COUNT = 3;
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   const handleJoinClick = () => {
//     setIsModalOpen(true);
//   };
//   const [registrationSuccess, setRegistrationSuccess] = useState(false);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setPlayers(['']);
//   };
//   const [teamName, setTeamName] = useState('');
//   const [captainName, setCaptainName] = useState('');
//   const [players, setPlayers] = useState(['']);
//   const [errorMessage, setErrorMessage] = useState('');


//   const handleTeamNameChange = (e) => {
//     setTeamName(e.target.value);
//   };
//   const handleCaptainNameChange = (e) => {
//     setCaptainName(e.target.value);
//   };
//   const handlePlayerNameChange = (index, e) => {
//     const updatedPlayers = [...players];
//     updatedPlayers[index] = e.target.value;
//     const playerName = e.target.value;
//     setPlayers(updatedPlayers);
//     if (e.target.value.trim() === '') {
//       alert('Player name cannot be empty.');
//     } else {
//       updatedPlayers[index] = playerName;
//       setPlayers(updatedPlayers);
//     }
//   };
//   // console.log(players);

//   const handleAddPlayer = () => {
//     if (players.length < 5) {
//       const hasEmptyName = players.some((player) => player.trim() === '');
//       if (hasEmptyName) {
//         alert('Player name cannot be empty');
//       } else {
//         setPlayers([...players, '']);
//       }
//     }
//   };
//   const handleRemovePlayer = (index) => {
//     if (players.length > 1) {
//       const updatedPlayers = [...players];
//       updatedPlayers.splice(index, 1);
//       setPlayers(updatedPlayers);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (teamName.trim() === '' || captainName.trim() === '') {
//       alert('Please fill in all required fields.');
//       return;
//     }
//     if (players.length < MIN_PLAYER_COUNT) {
//       alert(`Minimum ${MIN_PLAYER_COUNT} players are required.`);
//       return;
//     }

//     const joinTourData = [];
//     joinTourData.push(teamName);
//     joinTourData.push(captainName);
//     joinTourData.push(players);

//     // add backend
//     addJoinTourProject(joinTourData);


//     setRegistrationSuccess(true);

//     // Reset form data



//     setTeamName('');
//     setCaptainName('');
//     setPlayers(['']);
//   };
//   return (
//     <div className="tourContainer">
//       <Navbar/>
//       <br />
//       <div className="joinBackForward">
//         <span>Tournament</span>
//         <span>&nbsp;&nbsp;</span>
//         <span>&gt;</span>
//         <span>&nbsp;&nbsp;</span>
//         <span>Join</span>
//       </div>

//       <div className="joinCard">
//         <div className="sortJoinSport">
//             <label htmlFor="sports">Sort By: </label>
//             <select name="mysport" id="spt">
//               <option value="cricket">ALL</option>
//               <option value="volley">Sports</option>
//               <option value="football">Date</option>
//             </select>
//           </div>
//           <div className="Join-grid-container">
//             <aside className="Join-aside">
//               <img src="https://tse1.mm.bing.net/th?id=OIP.mXBciRfumdWadShHsVYFdAHaHf&pid=Api&rs=1&c=1&qlt=95&h=180" alt="No Image Found" />
//             </aside>
//             <section className="Join-section">
//               <h2 id = "Join-Title">Volleyball InterYear Tournament</h2>
//               <p>Game Type: Team</p>
//               <p>No of Players: 10</p>
//               <div className="joinContent">
//                 <button className="join-button" onClick={handleJoinClick}>Join</button>
//                 {isModalOpen && (
//                     <div>
//                       <div className="modal-overlay" onClick={closeModal}></div>
//                       <div className="modal">
//                         <div className="modal-content">
//                         <h2>VolleyBall Tournament</h2>
//                         <div className="input-container">
//                           <label htmlFor="captainName">Captain Name:</label>
//                           <input
//                             type="text"
//                             id="captainName"
//                             value={captainName}
//                             onChange={handleCaptainNameChange}
//                           />
//                         </div>
//                         <div className="input-container">

//                             <label htmlFor="teamName">Team Name:</label>
//                             <input
//                               type="text"
//                               id="teamName"
//                               value={teamName}
//                               onChange={handleTeamNameChange}
//                             />
//                           </div>
//                           <div className="input-container">

//                             {players.map((player, index) => (
//                               <div key={index} className="player-input">
//                               <label>Player Names {index+1}</label>

//                               <input
//                                 key={index}
//                                 type="text"
//                                 value={player}
//                                 onChange={(e) => handlePlayerNameChange(index, e)}
//                               />
//                               {index > 0 && (
//                                 <button
//                                   className="remove-player"
//                                   onClick={() => handleRemovePlayer(index)}
//                                 >
//                                   &times;
//                                 </button>
//                               )}
//                               <br />
//                               </div>
//                             ))}
//                             {players.length < 5 && (
//                               <button className="add-player" onClick={handleAddPlayer}>
//                                 +
//                               </button>
//                             )}
//                           </div>
//                           <button className="close-button" onClick={closeModal}>Close</button>
//                           {registrationSuccess ? (
//                               <div className="success-message">You Are Successfully Registered</div>
//                             ) : (
//                               <button className="join-button" onClick={handleSubmit}>
//                                 Submit
//                               </button>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   )}
//               </div>
//             </section>
//           </div>
//       </div>
//     </div>
//   )
// }



export default Tour;