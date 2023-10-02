
import React from 'react';

const TournamentCard = ({ tournament }) => {
  return (
    <div className='CreatedtourCard'>
      <p>Event Name: {tournament.eventName}</p>
      <p>Sports Selected: {tournament.selectedSport}</p>
      <p>Event Type: {tournament.tournamentType}</p>
      <p>Description: {tournament.description}</p>
      <p>Date: {tournament.date}</p>
      <p>DateTime: {tournament.DateTime}</p>
      <p>Venue: {tournament.venue}</p>
      <p>Attachment: {tournament.pdf}</p>
    </div>
  );
};

export default TournamentCard;
