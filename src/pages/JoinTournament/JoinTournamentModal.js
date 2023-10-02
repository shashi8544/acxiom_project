import React from 'react';
import './JoinTournament.css'
const Modal = ({ tournament, closeModal,collegeName,handleCollegeNameChange, captainName, teamName, players, handleCaptainNameChange, handleTeamNameChange, handlePlayerNameChange, handleAddPlayer, handleRemovePlayer, handleSubmit }) => {
  return (
    <div className="joinContent">
      <div>
        <div className="modal-overlay-join" onClick={closeModal}></div>
        <div className="modal-join">
                    <div className="modal-content">
                      <h2>VolleyBall Tournament</h2>
                      <div className="input-container">
                        <label htmlFor="captainName">Captain Name:</label>
                        <input
                          type="text"
                          id="captainName"
                          value={captainName}
                          onChange={handleCaptainNameChange}
                        />
                      </div>
                      <div className="input-container">

                        <label htmlFor="teamName">Team Name:</label>
                        <input
                          type="text"
                          id="teamName"
                          value={teamName}
                          onChange={handleTeamNameChange}
                        />
                      </div>
                      <div className="input-container">

                        <label htmlFor="teamName">College:</label>
                        <select
                          id="teamName"
                          value={collegeName}
                          onChange={handleCollegeNameChange}
                        >
                          <option value="">Select a college</option>
                          <option value="athletics">IIT Patna</option>
                          <option value="badminton">BIT Misra</option>
                          <option value="basketball">NIT Patna</option>
                          </select>
                      </div>
                      <br></br>
                      <div className="input-container">

                        {players.map((player, index) => (
                          <div key={index} className="player-input">
                            <label>Player Names {index + 1}</label>

                            <input
                              key={index}
                              type="text"
                              value={player}
                              onChange={(e) => handlePlayerNameChange(index, e)}
                            />
                            {index > 0 && (
                              <button
                                className="remove-player"
                                onClick={() => handleRemovePlayer(index)}
                              >
                                &times;
                              </button>
                            )}
                            <br />
                          </div>
                        ))}
                        {/* {players.length < 5 && ( */}
                          <button className="add-player" onClick={handleAddPlayer}>
                            +
                          </button>
                        {/* // )} */}
                      </div>
                      <button className="close-button" onClick={closeModal}>Close</button>

                      <button className="join-button" onClick={handleSubmit}>
                        Submit
                      </button>

                    </div>
                  </div>
      </div>
    </div>
  );
};

export default Modal;
