import React, { useState, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import './CreateTournament.css';
import { Link } from 'react-router-dom';
import firebase from "../../utils/configs/firebaseConfig";
import { CreateTournamentActionNewToFirebase } from "../../action/createTournamentAction";
import { createdTournamentList } from "../../action/createTournamentAction";
import createimg from '../../assets/tour-images/createTour.jpeg';
import { updateTournamentInFirestore, getTournamentsFromFirestore } from "../../action/createTournamentAction"
import { message } from 'antd';

const database = firebase.database();
const firestore = firebase.firestore();

const CreateTournament = () => {
  const [isUserCreateThisTournament, SetIsUserCreateThisTournament] = useState(true);
  const [selectedTournamentForEdit, setSelectedTournamentForEdit] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isMatchModalOpen, setIsMatchModalOpen] = useState(false);
  const [isEndTournamentOpen, setIsEndTournamentModalOpen] = useState(false);
  const [selectedSportFilter, setSelectedSportFilter] = useState('all');
  const [eventName, setEventName] = useState('');
  const [selectedSport, setSelectedSport] = useState('');
  const [tournamentType, setTournamentType] = useState('');
  const [description, setDescription] = useState('');
  const [endTournamentImage, setEndTournamentImage] = useState(null);
  const [venue, setVenue] = useState('');
  const [date, setDate] = useState('');
  const [dateTime, setDateTime] = useState('');
  const [formDataList, setFormDataList] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);
  const [tournaments, setTournaments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [sortOption, setSortOption] = useState('default');
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const currentUser = firebase.auth().currentUser;
    if (currentUser) {
      // Use 'where' function to query the 'admins' collection based on the current user's UID
      firestore.collection('admins').where(firebase.firestore.FieldPath.documentId(), '==', currentUser.uid).get()
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            setIsAdmin(true);
          }
        })
        .catch((error) => console.error('Error checking admin status:', error));
    }
  }, []);

  useEffect(() => {
    // Fetch the data when the component mounts
    createdTournamentList()
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
        setLoading(false);
      });
  }, []);
  useEffect(() => {
    // Fetch the data when the component mounts
    getTournamentsFromFirestore()
      .then((data) => {
        setTournaments(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  }, []);
  // If the user is not an admin, redirect them or show an error message
  // if (!isAdmin) {
  //   return (
  //     <div>
  //       <p>You don't have access to this page. Go back and Sign In with Admin Email, Don't Refresh Your Page</p>
  //     </div>
  //   ); // Customize this message or implement a redirection
  // }
  const handleEditClick = (tournament) => {
    setSelectedTournamentForEdit(tournament);
    setEventName(tournament.eventName);
    setSelectedSport(tournament.selectedSport);
    setTournamentType(tournament.tournamentType);
    setVenue(tournament.venue);
    setDate(tournament.date);
    // setTime(tournament.time);
    setDescription(tournament.description);
    setIsModalOpen(true);
  };
  const handleMatchClick = (tournament) => {
    setIsMatchModalOpen(true);
  }
  const handleCloseMatchClick = () => {
    setIsMatchModalOpen(false);
  }
  const handleEndTournamentClick = (tournament) => {
    setIsEndTournamentModalOpen(true);
  }
  const handleCloseEndTournamentClick = () => {
    setIsEndTournamentModalOpen(false);
  }
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      // Assuming you have a function to get the selected file (omitted for brevity).
      // Replace 'getSelectedFile' with the actual function to get the file.
      // const selectedFile = getSelectedFile(); // Get the selected file from the input

      // Update the tournament data in Firestore using the backend function
      await updateTournamentInFirestore(selectedTournamentForEdit.id, {
        eventName,
        selectedSport,
        tournamentType,
        venue,
        date,
        // time,
        description,
      }, selectedFile);
  
      message.success('Your Data is Successfully Updated!!!!!!!!');
      // message.success("Your Data is Successfully Updated!!!!!!!!");
      setEventName('');
      setSelectedSport('');
      setTournamentType('');
      setVenue('');
      setDate('');
      // setTime('');
      setDescription('');
      setSelectedFile(null);
      setIsModalOpen(false);
      window.location.reload();
      // Rest of the code...
    } catch (error) {
      alert(error.message);
    }
  };

  const handleJoinClick = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const message = await CreateTournamentActionNewToFirebase({
        eventName,
        selectedSport,
        tournamentType,
        venue,
        date,
        // time,
        description,
      }, selectedFile);

      // Clear form data for the next entry
      setEventName('');
      setSelectedSport('');
      setTournamentType('');
      setVenue('');
      setDate('');
      // setTime('');
      setDescription('');
      setSelectedFile(null);
      setIsModalOpen(false);
      // message.success("Your Tournament Is Created");
      window.location.reload();
    } catch (error) {
      alert(error.message);
    }
  };
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);
  };
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
  };
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  const handleEndTournamentImageChange = (e) => {
    const file = e.target.files[0];
    setEndTournamentImage(file);
  };


  return (
    <div className="CreateTourContainer">
      <Navbar />
      <br />
      <div className="joinBackForwardcreate">
        <Link to="/tour"><span>Tournament</span></Link>
        <span>&nbsp;&nbsp;</span>
        <span>&gt;</span>
        <span>&nbsp;&nbsp;</span>
        <span>Create</span>
      </div>
      <div className="createatour">
        <section className='createContest'>
          <div classname="createContestButton">
            {
              isUserCreateThisTournament && (<div className="create-button" onClick={handleJoinClick}>Create a tournament</div>)
            }
            {
              !isUserCreateThisTournament && (<p class="create-button">You are Successfully registered.</p>)
            }
            {
              isModalOpen && (
                <div>
                  <div className="modal-overlay-create" onClick={closeModal}></div>
                  <div className="create-modal">

                    <div className="form-group">
                      <label htmlFor="eventName">Event Name</label>
                      <input
                        type="text"
                        id="eventName"
                        value={eventName}
                        onChange={(e) => setEventName(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="selectedSport">Sports</label>
                      <select
                        id="selectedSport"
                        value={selectedSport}
                        onChange={(e) => setSelectedSport(e.target.value)}
                      >
                        <option value="">Select a sport</option>
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
                    </div>

                    <div className="form-group">
                      <label htmlFor="tournamentType">Tournament Type</label>
                      <select
                        id="tournamentType"
                        value={tournamentType}
                        onChange={(e) => setTournamentType(e.target.value)}
                      >
                        <option value="">Select a tournament type</option>
                        <option value="single">Single Tournament</option>
                        <option value="double">Team Tournament</option>
                        {/* Add more tournament type options here */}
                      </select>
                    </div>

                    {/* Venue Input */}
                    <div className="form-group">
                      <label htmlFor="venue">Venue</label>
                      <input
                        type="text"
                        id="venue"
                        value={venue}
                        onChange={(e) => setVenue(e.target.value)}
                      />
                    </div>

                    {/* Date Input */}
                    <div className="form-group">
                      <label htmlFor="date">Tournament Start Date</label>
                      <input
                        type="date"
                        id="date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>

                    {/*Last apply Date and time Input */}
                    <div className="form-group">
                      <label htmlFor="dateTime">Last Date to apply</label>
                      <input
                        type="datetime-local"
                        id="dateTime"
                        value={dateTime}
                        onChange={(e) => setDateTime(e.target.value)}
                      />
                    </div>

                    <div className="form-group">
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="pdf-input">
                      <label htmlFor="pdfFile">Rules</label>
                      <input
                        type="file"
                        id="pdfFile"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </div>

                    <button className="close-button" onClick={closeModal}>Close</button>

                    {selectedTournamentForEdit ? (
                      <button className="update-button" onClick={handleUpdate}>
                        Update
                      </button>
                    ) : (
                      <button type="submit" onClick={handleSubmit}>
                        Create
                      </button>
                    )}
                  </div>
                </div>

              )
            }
            {
              isMatchModalOpen && (
                <div>
                  <div className="modal-overlay-create" onClick={handleCloseMatchClick}></div>
                  <div className="create-modal">
                    <div className="pdf-input">
                      <label htmlFor="pdfFile">Add pdf of the matches</label>
                      <input
                        type="file"
                        id="pdfFile"
                        accept=".pdf"
                        onChange={handleFileChange}
                      />
                    </div>
                    <button className="close-button" onClick={handleCloseMatchClick}>Close</button>
                    <button type="submit" onClick={handleSubmit}>
                      Add
                    </button>
                  </div>
                </div>

              )
            }
            {
              isEndTournamentOpen && (
                <div>
                  <div className="modal-overlay-create" onClick={handleCloseEndTournamentClick}></div>
                  <div className="create-modal">
                    <div className='end-results'>
                      <label htmlFor="description">Description</label>
                      <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                      ></textarea>
                    </div>
                    <div className="image-input">
                      <label htmlFor="endTournamentImage">Add image for end tournament results</label>
                      <input
                        type="file"
                        id="endTournamentImage"
                        accept="image/*"
                        onChange={handleEndTournamentImageChange}
                      />
                    </div>
                    <button className="close-button" onClick={handleCloseEndTournamentClick}>Close</button>
                    <button type="submit" onClick={handleSubmit}>
                      Update
                    </button>
                  </div>
                </div>
              )
            }
          </div>
        </section>
      </div>
      {/* <TournamentCreatedTournament/> */}
      <div>
        <div className='h1-create'>
          <h1>Created Tournament</h1>
        </div>
        <div className="sortContainer">
          <label htmlFor="sortOption">Sort By: </label>
          <select
            name="mysport"
            id="spt"
            onChange={(e) => setSelectedSportFilter(e.target.value)}
          >
            <option value="all">ALL</option>
            <option value="volleyball">volleyball</option>
            <option value="football">football</option>
            <option value="basketball">basketball</option>
            {/* Add more sport options here */}
          </select>
        </div>

        {/* Search Input */}
        <div className="searchContainer">
          <input
            type="text"
            placeholder="Search by Event Name"
            value={searchQuery}
            onChange={handleSearchChange}
          />
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
                  <button
                    className="custom-button"
                    onClick={() => handleEditClick(tournament)} // Handle Edit button click
                  >
                    Edit
                  </button>
                  <button className='add-match-button' onClick={() => handleMatchClick(tournament)}>Add matches</button>
                  <button className='end-tournament-button' placeholder='Results of the tournament, i.e: First winner, Second winnner, Third winner, etc.' onClick={() => handleEndTournamentClick(tournament)}> End tournament</button>
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
                      {/* <a href={tournament.pdf} target='_blank'>pdf</a> */}
                      {/* <button>{tournament.pdf}</button> */}
                    </div>
                  </div>
                </div>
              ))}

          </div>)}
      </div>







    </div>
  )
}

export default CreateTournament;
