import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './JoinTournament.css';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
// import { addJoinTourProject } from '../../action/joinTourAction';
import { fetchUserJoinedTournamentsFromBackend, updateUserJoinedTournamentInBackend } from "../../action/joinTourAction"
import firebase from "../../utils/configs/firebaseConfig";
import { updateJoinTeamData } from "../../action/joinTourAction";
import { createdTournamentList } from "../../action/createTournamentAction";
import Modal from './JoinTournamentModal'
import Loader from '../../Models/Loader/loader'

const database = firebase.database();
const firestore = firebase.firestore();

const JoinTournament = () => {
  const [submitted, setSubmitted] = useState(false);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joinedTournaments, setJoinedTournaments] = useState([]);
  const [loadingUser, setLoadingUser] = useState(true);
  // const handleAuthStateChange = (user) => {
  //   setLoadingUser(false); // Set loading to false, regardless of whether user is signed in or not

  //   // If the user is signed in or signed out, refresh the page
  //   window.location.reload();
  // };

  // useEffect to listen for authentication state changes (user login/logout)
  // useEffect(() => {
  //   const unsubscribe = firebase.auth().onAuthStateChanged(handleAuthStateChange);

  //   // Cleanup the event listener when the component unmounts
  //   return () => {
  //     unsubscribe();
  //   };
  // }, []);
  // Function to check if the user has joined a specific tournament
  const hasUserJoinedTournament = (tournament) => {
    // Check if the tournament ID exists in the joinedTournaments array
    return joinedTournaments.some((joinedTournament) => joinedTournament.id === tournament.id);
  };
  // useEffect(() => {
  //   // Check if a user is signed in when the component mounts
  //   firebase.auth().onAuthStateChanged((user) => {
  //     setLoadingUser(false); // Set loading to false, regardless of whether user is signed in or not
  //     if (user) {
  //       // If the user is signed in, refresh the page with a loader
  //       window.location.reload();
  //     }
  //   });
  // }, []);
  useEffect(() => {
    const userId = firebase.auth().currentUser?.uid;
    if (userId) {
      fetchUserJoinedTournamentsFromBackend(userId)
        .then((userJoinedTournaments) => {
          console.log(userJoinedTournaments);
          setJoinedTournaments(userJoinedTournaments);

          // Store the fetched data in local storage
          localStorage.setItem('userJoinedTournaments', JSON.stringify(userJoinedTournaments));
        })
        .catch((error) => {
          console.error('Error fetching user joined tournaments:', error);
        });
    }
  }, []);
  useEffect(() => {
    // Read the data from local storage
    const storedUserJoinedTournaments = localStorage.getItem('userJoinedTournaments');
    if (storedUserJoinedTournaments) {
      const parsedUserJoinedTournaments = JSON.parse(storedUserJoinedTournaments);
      setJoinedTournaments(parsedUserJoinedTournaments);
    }
  }, []);

  useEffect(() => {
    // Fetch the data when the component mounts
    createdTournamentList()
      .then((data) => {
        // Set the fetched data in the state
        setTournaments(data);
        console.log(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      })
  }, []);
  useEffect(() => {
    const isFormSubmitted = localStorage.getItem('isFormSubmitted');
    if (isFormSubmitted === 'true') {
      setSubmitted(true);
    }
  }, []);

  // const MIN_PLAYER_COUNT = 3;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [teamName, setTeamName] = useState('');
  const [captainName, setCaptainName] = useState('');
  const [collegeName, setCollegeName] = useState('');
  const [players, setPlayers] = useState(['']);
  const [selectedTournament, setSelectedTournament] = useState(null); 
  const [isUserJoinThisTournament, setIsUserJoinThisTournament] = useState(true);
  const [selectedSportFilter, setSelectedSportFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [hasJoined, setHasJoined] = useState(false);
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth.userData);
  const handleJoinClick = (tournament) => {

    if (!user) {
      // If the user is not signed in, redirect to the login and signup page
      alert("please sign in to join this tournament!!!!1") // Replace '/login-or-signup' with your actual route
      return;
    }
    setSelectedTournament(tournament); // Set the selected tournament
    setIsModalOpen(true); // Open the modal
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleTeamNameChange = (e) => {
    setTeamName(e.target.value);
  };
  const handleCaptainNameChange = (e) => {
    setCaptainName(e.target.value);
  };
  const handleCollegeNameChange = (e) => {
    setCollegeName(e.target.value);
  }
  const handlePlayerNameChange = (index, e) => {
    const updatedPlayers = [...players];
    updatedPlayers[index] = e.target.value;
    const playerName = e.target.value;
    setPlayers(updatedPlayers);
    if (e.target.value.trim() === '') {
      alert('Player name cannot be empty.');
    } else {
      updatedPlayers[index] = playerName;
      setPlayers(updatedPlayers);
    }
  };
  // console.log(players);

  const handleAddPlayer = () => {
    // if (players.length < 5) {
    const hasEmptyName = players.some((player) => player.trim() === '');
    if (hasEmptyName) {
      alert('Player name cannot be empty');
    } else {
      setPlayers([...players, '']);
    }
    // }
  };
  const handleRemovePlayer = (index) => {
    if (players.length > 1) {
      const updatedPlayers = [...players];
      updatedPlayers.splice(index, 1);
      setPlayers(updatedPlayers);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (teamName.trim() === '' || captainName.trim() === '' || !collegeName) {
      alert('Please fill in all required fields.');
      return;
    }
    // if (players.length < MIN_PLAYER_COUNT) {
    //   alert(`Minimum ${MIN_PLAYER_COUNT} players are required.`);
    //   return;
    // }

    // Assuming you have a way to get the "tournamentId" of the selected tournament
    const tournamentId = selectedTournament.id;
    if (!tournamentId) {
      alert('Error: Tournament ID not available.');
      return;
    }

    // Assuming you have a way to get the "userId" of the current signed-in user

    if (!user) {
      alert('Error: User ID not available.');
      return;
    }
    const userId = user.uid;

    // Create the join data object to be stored in the backend
    const joinData = {
      teamName: teamName,
      captainName: captainName,
      eventName: selectedTournament.eventName,
      selectedSport: selectedTournament.selectedSport,
      players: players,
      // Add any other relevant data you want to store about the user's join
    };

    // Update the user's joined tournament in the backend
    updateUserJoinedTournamentInBackend(userId, tournamentId, joinData)
      .then((success) => {
        if (success) {
          setIsModalOpen(false); // Close the modal after successful submission
          setCaptainName('');
          setCollegeName('');
          setTeamName('');
          setPlayers([]);
          setIsUserJoinThisTournament(false);
          setHasJoined(true);
          alert('You have successfully joined the tournament!');
          navigate('/AppliedTournament');
        } else {
          alert('Error: Failed to join the tournament. Please try again later.');
        }
      })
      .catch((error) => {
        console.error('Error updating user joined tournament:', error);
        alert('Error: Failed to join the tournament. Please try again later.');
      });
  };
  const handleCloseModel = (e) => {
    setIsModalOpen(false);
    setCaptainName('');
    setCollegeName('');
    setTeamName('');
    setPlayers([]);
  }
  return (
    <div className="tourContainer">
      <Navbar />
      <br />
      <div className="joinBackForward">
        <Link to="/tour"><span>Tournament</span></Link>
        <span>&nbsp;&nbsp;</span>
        <span>&gt;</span>
        <span>&nbsp;&nbsp;</span>
        <span>Join</span>
      </div>

      <div className="joinCard">
        <div className="sortJoinSport">
          <label htmlFor="sports">Sort By: </label>
          <select name="mysport" id="spt" onChange={(e) => setSelectedSportFilter(e.target.value)}>
            <option value="all">ALL</option>
            <option value="athletics">Athletics</option>
            <option value="badminton">Badminton</option>
            <option value="basketball">Basketball</option>
            <option value="carrom">Carrom</option>
            <option value="chess">Chess</option>
            <option value="cricket">Cricket</option>
            <option value="football">Football</option>
            <option value="hockey">Hockey</option>
            <option value="javelin-throw">Javelin Throw</option>
            <option value="kabaddi">kabaddi</option>
            <option value="tennis">Tennis</option>
            <option value="shotput-throw">Shotput Throw</option>
            <option value="squash">Squash</option>
            <option value="swimming">Swimming</option>
            <option value="table-tennis">Table Tennis</option>
            <option value="volleyball">Volleyball</option>
            <option value="water-polo">Water Polo</option>
            <option value="weightlifting">Weightlifting</option>
            {/* Add more sport options here */}
          </select>
          <div className="searchBox">
            <input
              type="text"
              placeholder="Search by Event Name"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
        </div>

        <div className="Join-grid-container">
          {/* <aside className="Join-aside">
            <img src="https://tse1.mm.bing.net/th?id=OIP.mXBciRfumdWadShHsVYFdAHaHf&pid=Api&rs=1&c=1&qlt=95&h=180" alt="No Image Found" />
          </aside> */}
          <div className="Join-section">
            <div>
              <div className='h1-create'>
                <h1>Ongoing Tournament</h1>
              </div>
              {loading ? (
                <div className="loader-container">
                  <div className="loader"></div>
                </div>
              ) : (
                <div className='created-card'>
                  {tournaments
                    .filter((tournament) => {
                      if (selectedSportFilter === 'all') {
                        return true;
                      } else {
                        return tournament.selectedSport === selectedSportFilter;
                      }
                    })
                    .filter((tournament) =>
                      tournament.eventName.toLowerCase().includes(searchQuery.toLowerCase())
                    )
                    .map((tournament) => (
                      <div className='CreatedtourCard' key={tournament.eventName}>
                        <div className='venue'>
                          <p>{tournament.venue}</p>
                        </div>
                        <div className='event-name'>
                          <h1>{tournament.eventName}</h1>
                        </div>
                        <div className='left-bottom'>
                          <div className='sports-type'>
                            <p>{tournament.selectedSport}</p>
                            <p>{tournament.tournamentType}</p>
                          </div>
                          <div className='date-time'>
                            <p>{tournament.date}</p>
                            <p>{tournament.time}</p>
                            <a href={tournament.pdf} target='_blank'>pdf</a>
                            {/* <button>{tournament.pdf}</button> */}
                          </div>
                        </div>
                        {user ? (
                          hasUserJoinedTournament(tournament) ? (
                            <button className="join-button">
                              You have successfully joined this tournament.
                            </button>
                          ) : (
                            <button
                              className="join-button"
                              onClick={() => handleJoinClick(tournament)}
                            >
                              Join
                            </button>
                          )
                        ) : (
                          <button
                            className="join-button"
                            onClick={() => handleJoinClick(tournament)}
                          >
                            Please sign in to join this tournament.
                          </button>
                        )}
                      </div>
                    ))}
                </div>
              )}
            </div>
          </div>
          {isModalOpen && selectedTournament && (
            <Modal
              tournament={selectedTournament} // Pass the selected tournament data to the Modal
              closeModal={handleCloseModel} // Pass the closeModal function to the Modal
              collegeName={collegeName}
              handleCollegeNameChange={handleCollegeNameChange}
              captainName={captainName}
              teamName={teamName}
              players={players}
              handleCaptainNameChange={handleCaptainNameChange}
              handleTeamNameChange={handleTeamNameChange}
              handlePlayerNameChange={handlePlayerNameChange}
              handleAddPlayer={handleAddPlayer}
              handleRemovePlayer={handleRemovePlayer}
              handleSubmit={handleSubmit}
            />
          )}
        </div>
      </div>
    </div>
  )
}

export default JoinTournament
